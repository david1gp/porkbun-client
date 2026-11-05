import { expect, test } from "bun:test"
import * as a from "valibot"
import { porkbunEndpointCall } from "./porkbunEndpointCall.js"
import { porkbunEndpointDefine } from "./porkbunEndpointDefine.js"
import { porkbunEndpointRequestCreate } from "./porkbunEndpointRequestCreate.js"
import { porkbunTestClient } from "./porkbunTestClient.test.js"

const endpoint = porkbunEndpointDefine({
  op: "optionalPathTest",
  method: "POST",
  path: "/records/{domain}/{type}/{subdomain?}",
  auth: "required",
  scope: "dns",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Optional trailing path",
  inputSchema: a.object({
    domain: a.string(),
    type: a.string(),
    subdomain: a.optional(a.string()),
    content: a.optional(a.string()),
  }),
  responseSchema: a.looseObject({ status: a.string() }),
})

for (const [subdomain, suffix] of [
  [undefined, ""],
  ["", ""],
  ["www/a b", "/www%2Fa%20b"],
] as const) {
  test(`optional trailing path ${JSON.stringify(subdomain)} drops its slash or encodes its segment, never leaking to body`, async () => {
    const { client, calls } = porkbunTestClient()
    const result = await porkbunEndpointCall(client, endpoint, {
      domain: "example.com",
      type: "A",
      subdomain,
      content: "test",
    })
    expect(result.success).toBe(true)
    expect(calls[0]?.url).toBe(`https://api.porkbun.com/api/json/v3/records/example.com/A${suffix}`)
    expect(calls[0]?.body).toEqual({ content: "test", apikey: "pk1_test", secretapikey: "sk1_test" })
  })
}

test("optional paths work with GET query and header authentication", async () => {
  const { client, calls } = porkbunTestClient()
  await porkbunEndpointCall(
    client,
    { ...endpoint, method: "GET" },
    { domain: "example.com", type: "A", content: "a b" },
  )
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/records/example.com/A?content=a+b")
  expect(calls[0]?.body).toBeUndefined()
  expect(calls[0]?.headers.get("X-API-Key")).toBe("pk1_test")
})

test("missing required path values and holes in optional suffixes remain Results", () => {
  const { client } = porkbunTestClient()
  expect(porkbunEndpointRequestCreate(client, endpoint, { type: "A" }, {})).toMatchObject({
    success: false,
    code: "INVALID_PATH_PARAMETER",
  })
  const multiple = { ...endpoint, path: "/test/{first?}/{last?}" }
  expect(porkbunEndpointRequestCreate(client, multiple, { last: "set" }, {})).toMatchObject({
    success: false,
    code: "INVALID_PATH_PARAMETER",
  })
  const absent = porkbunEndpointRequestCreate(client, multiple, {}, {})
  expect(absent.success && absent.data.url.pathname).toBe("/api/json/v3/test")
})

test("embedded required placeholders preserve existing URL encoding behavior", () => {
  const { client } = porkbunTestClient()
  const result = porkbunEndpointRequestCreate(client, { ...endpoint, path: "/prefix-{domain}" }, { domain: "a/b" }, {})
  expect(result.success && result.data.url.pathname).toBe("/api/json/v3/prefix-a%2Fb")
})
