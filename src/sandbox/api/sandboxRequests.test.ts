import { expect, test } from "bun:test"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { sandboxResetEndpoint } from "../endpoint/sandboxResetEndpoint.js"
import { sandboxTopupEndpoint } from "../endpoint/sandboxTopupEndpoint.js"
import { sandboxWebhookTriggerEndpoint } from "../endpoint/sandboxWebhookTriggerEndpoint.js"

test("sandboxTopup builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, sandboxTopupEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/sandbox/topup")
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
})
