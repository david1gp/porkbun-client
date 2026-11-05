import { expect, test } from "bun:test"
import * as a from "valibot"
import { porkbunEndpointCall } from "./porkbunEndpointCall.js"
import { porkbunEndpointDefine } from "./porkbunEndpointDefine.js"
import { porkbunTestClient } from "./porkbunTestClient.test.js"

const endpoint = porkbunEndpointDefine({
  op: "testRecordCreate",
  method: "POST",
  path: "/record/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Test record creation",
  inputSchema: a.object({
    domain: a.string(),
    enabled: a.optional(a.boolean()),
    tlds: a.optional(a.array(a.string())),
  }),
  responseSchema: a.looseObject({ status: a.literal("SUCCESS"), count: a.optional(a.number()) }),
})

test("POST encodes path parameters, excludes them from JSON and attaches credentials, headers, and an automatic idempotency key", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", additive: true })
  const signal = new AbortController().signal
  expect(
    (
      await porkbunEndpointCall(
        client,
        endpoint,
        { domain: "a/b ?#", enabled: true },
        { signal, headers: { "Payment-Signature": "signed" } },
      )
    ).success,
  ).toBe(true)
  const call = calls[0]!
  expect(call.url).toBe("https://api.porkbun.com/api/json/v3/record/a%2Fb%20%3F%23")
  expect(call.init?.method).toBe("POST")
  expect(call.init?.signal).toBe(signal)
  expect(call.body).toEqual({ enabled: true, apikey: "pk1_test", secretapikey: "sk1_test" })
  expect(call.headers.get("content-type")).toBe("application/json")
  expect(call.headers.get("accept")).toBe("application/json")
  expect(call.headers.get("user-agent")).toBe("porkbun-client/0.1.0")
  expect(call.headers.get("payment-signature")).toBe("signed")
  expect(call.headers.get("idempotency-key")).toMatch(/^[0-9a-f-]{36}$/)
})

test("GET uses headers for credentials, repeated query arrays and literal booleans, never a body", async () => {
  const { client, calls } = porkbunTestClient()
  const read = { ...endpoint, method: "GET" as const }
  await porkbunEndpointCall(client, read, { domain: "example.com", enabled: false, tlds: ["com", "net"] })
  const call = calls[0]!
  expect(call.url).toBe("https://api.porkbun.com/api/json/v3/record/example.com?enabled=false&tlds=com&tlds=net")
  expect(call.headers.get("x-api-key")).toBe("pk1_test")
  expect(call.headers.get("x-secret-api-key")).toBe("sk1_test")
  expect(call.headers.has("idempotency-key")).toBe(false)
  expect(call.init?.body).toBeUndefined()
})

test("GET supports explicit OpenAPI non-exploded form arrays", async () => {
  const { client, calls } = porkbunTestClient()
  await porkbunEndpointCall(
    client,
    { ...endpoint, method: "GET", query: { tlds: { style: "form", explode: false } } },
    { domain: "example.com", tlds: ["com", "net"] },
  )
  expect(new URL(calls[0]!.url).searchParams.get("tlds")).toBe("com,net")
})

test("POST public endpoints always send JSON without credentials", async () => {
  const { client, calls } = porkbunTestClient()
  const publicEndpoint = { ...endpoint, auth: "none" as const, agent: { ...endpoint.agent, safe: true } }
  await porkbunEndpointCall(client, publicEndpoint, { domain: "example.com" })
  expect(calls[0]!.body).toEqual({})
  expect(calls[0]!.headers.has("idempotency-key")).toBe(false)
})

test("explicit idempotency keys are used verbatim, including on safe POSTs", async () => {
  const { client, calls } = porkbunTestClient()
  await porkbunEndpointCall(client, endpoint, { domain: "example.com" }, { idempotencyKey: "retry-me" })
  await porkbunEndpointCall(
    client,
    { ...endpoint, agent: { ...endpoint.agent, safe: true } },
    { domain: "example.com" },
    { idempotencyKey: "read-key" },
  )
  expect(calls.map((call) => call.headers.get("idempotency-key"))).toEqual(["retry-me", "read-key"])
})

test("missing credentials fail locally with API_KEY_REQUIRED before fetching", async () => {
  const { client, calls } = porkbunTestClient()
  delete client.secretApiKey
  const result = await porkbunEndpointCall(client, endpoint, { domain: "example.com" })
  expect(result).toMatchObject({ success: false, op: endpoint.op, code: "API_KEY_REQUIRED" })
  expect(calls).toHaveLength(0)
})

test("invalid input fails locally and preserves a useful validation summary", async () => {
  const { client, calls } = porkbunTestClient()
  // @ts-expect-error Deliberately invalid input.
  const result = await porkbunEndpointCall(client, endpoint, { domain: 42 })
  expect(result.success).toBe(false)
  if (!result.success) {
    expect(result.errorMessage).toContain("domain")
    expect(result.errorData).toBe('{"domain":42}')
  }
  expect(calls).toHaveLength(0)
})

for (const [status, code] of [
  [400, "INVALID_DOMAIN"],
  [200, "PAYMENT_REQUIRED"],
  [429, "RATE_LIMIT_EXCEEDED"],
] as const) {
  test(`HTTP ${status} API errors preserve code, status, raw body and remediation`, async () => {
    const body = {
      status: "ERROR",
      code,
      message: "Denied",
      next_action: { type: "fix_request", hint: "Fix the request" },
    }
    const { client } = porkbunTestClient(body, status)
    expect(await porkbunEndpointCall(client, endpoint, { domain: "example.com" })).toEqual({
      success: false,
      op: endpoint.op,
      code,
      statusCode: status,
      errorMessage: "Denied — next: Fix the request",
      errorData: JSON.stringify(body),
    })
  })
}

test("non-JSON HTTP errors retain status and raw response text", async () => {
  const { client } = porkbunTestClient("<html>Bad gateway</html>", 502)
  expect(await porkbunEndpointCall(client, endpoint, { domain: "example.com" })).toMatchObject({
    success: false,
    statusCode: 502,
    errorData: "<html>Bad gateway</html>",
  })
})

test("non-JSON successful responses are validation errors rather than exceptions", async () => {
  const { client } = porkbunTestClient("not JSON")
  expect(await porkbunEndpointCall(client, endpoint, { domain: "example.com" })).toMatchObject({
    success: false,
    statusCode: 200,
    errorData: "not JSON",
  })
})

test("schema mismatch rejects a success response but additive fields survive", async () => {
  const { client } = porkbunTestClient({ status: "SUCCESS", count: "1" })
  const result = await porkbunEndpointCall(client, endpoint, { domain: "example.com" })
  expect(result.success).toBe(false)
  if (!result.success) expect(result.errorMessage).toContain("count")
  const valid = porkbunTestClient({ status: "SUCCESS", future: 42 })
  const success = await porkbunEndpointCall(valid.client, endpoint, { domain: "example.com" })
  expect(success).toEqual({ success: true, data: { status: "SUCCESS", future: 42 } })
})

test("network and response-stream failures become Results", async () => {
  const { client } = porkbunTestClient()
  client.fetch = async () => {
    throw new Error("offline")
  }
  expect(await porkbunEndpointCall(client, endpoint, { domain: "example.com" })).toMatchObject({
    success: false,
    errorData: "offline",
  })
  client.fetch = async () =>
    new Response(
      new ReadableStream({
        start(controller) {
          controller.error(new Error("stream broke"))
        },
      }),
    )
  expect(await porkbunEndpointCall(client, endpoint, { domain: "example.com" })).toMatchObject({
    success: false,
    errorData: "stream broke",
  })
})

test("repeated path placeholders use the original input value every time", async () => {
  const { client, calls } = porkbunTestClient()
  await porkbunEndpointCall(client, { ...endpoint, path: "/record/{domain}/{domain}" }, { domain: "example.com" })
  expect(calls[0]!.url).toEndWith("/record/example.com/example.com")
  expect(calls[0]!.body).not.toHaveProperty("domain")
})

test("invalid header characters return a serialization error instead of throwing", async () => {
  const { client, calls } = porkbunTestClient()
  const result = await porkbunEndpointCall(
    client,
    endpoint,
    { domain: "example.com" },
    { headers: { "X-Invalid": "bad\nheader" } },
  )
  expect(result).toMatchObject({ success: false, op: endpoint.op, errorMessage: "Request serialization failed" })
  expect(calls).toHaveLength(0)
})
