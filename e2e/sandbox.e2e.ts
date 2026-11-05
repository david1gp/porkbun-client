import { expect, test } from "bun:test"
import * as a from "valibot"
import { sandboxResetEndpoint } from "../src/sandbox/endpoint/sandboxResetEndpoint.js"
import { sandboxTopupEndpoint } from "../src/sandbox/endpoint/sandboxTopupEndpoint.js"
import { sandboxWebhookTriggerEndpoint } from "../src/sandbox/endpoint/sandboxWebhookTriggerEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

const clientResult = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl, apiKey: "pk1_mock", secretApiKey: "sk1_mock" })
if (!clientResult.success) throw new Error(clientResult.errorMessage)
const client = clientResult.data

test("mock sandboxTopup returns a valid response", async () => {
  const result = await porkbunEndpointCall(client, sandboxTopupEndpoint, {}, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(sandboxTopupEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock sandboxReset returns a valid response", async () => {
  const result = await porkbunEndpointCall(client, sandboxResetEndpoint, {}, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(sandboxResetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock sandboxWebhookTrigger returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    sandboxWebhookTriggerEndpoint,
    { eventType: "domain.registered" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(sandboxWebhookTriggerEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
