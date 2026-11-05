import { expect, test } from "bun:test"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { sandboxResetEndpoint } from "../endpoint/sandboxResetEndpoint.js"
import { sandboxTopupEndpoint } from "../endpoint/sandboxTopupEndpoint.js"
import { sandboxWebhookTriggerEndpoint } from "../endpoint/sandboxWebhookTriggerEndpoint.js"

test("sandboxTopup builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, sandboxTopupEndpoint, { amount: 12500 })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/sandbox/topup")
  expect(JSON.parse(String(calls[0]!.init?.body)).amount).toBe(12500)
})

test("sandboxReset builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, sandboxResetEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/sandbox/reset")
})

test("sandboxWebhookTrigger builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, sandboxWebhookTriggerEndpoint, { eventType: "domain.registered" })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/sandbox/triggerWebhook")
  expect(JSON.parse(String(calls[0]!.init?.body)).eventType).toBe("domain.registered")
})

test("sandbox library wrappers forward typed credit and webhook inputs with request options", async () => {
  const { sandboxTopup } = await import("./sandboxTopup.js")
  const { sandboxWebhookTrigger } = await import("./sandboxWebhookTrigger.js")
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  expect((await sandboxTopup(client, { amount: 25000 }, { idempotencyKey: "sandbox-credit" })).success).toBe(true)
  expect(JSON.parse(String(calls[0]!.init?.body)).amount).toBe(25000)
  expect(new Headers(calls[0]!.init?.headers).get("Idempotency-Key")).toBe("sandbox-credit")
  expect(
    (await sandboxWebhookTrigger(client, { eventType: "dns.record.created", domain: "example.com" })).success,
  ).toBe(true)
  expect(JSON.parse(String(calls[1]!.init?.body))).toMatchObject({
    eventType: "dns.record.created",
    domain: "example.com",
  })
})
