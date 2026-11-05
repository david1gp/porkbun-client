import { expect, test } from "bun:test"
import type { PorkbunEndpoint } from "../src/shared/PorkbunEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"
import { webhookCreateEndpoint } from "../src/webhook/endpoint/webhookCreateEndpoint.js"
import { webhookDeleteEndpoint } from "../src/webhook/endpoint/webhookDeleteEndpoint.js"
import { webhookDeliveryGetEndpoint } from "../src/webhook/endpoint/webhookDeliveryGetEndpoint.js"
import { webhookDeliveryListEndpoint } from "../src/webhook/endpoint/webhookDeliveryListEndpoint.js"
import { webhookDeliveryResendEndpoint } from "../src/webhook/endpoint/webhookDeliveryResendEndpoint.js"
import { webhookEventTypeListEndpoint } from "../src/webhook/endpoint/webhookEventTypeListEndpoint.js"
import { webhookGetEndpoint } from "../src/webhook/endpoint/webhookGetEndpoint.js"
import { webhookListEndpoint } from "../src/webhook/endpoint/webhookListEndpoint.js"
import { webhookSecretRotateEndpoint } from "../src/webhook/endpoint/webhookSecretRotateEndpoint.js"
import { webhookTestEndpoint } from "../src/webhook/endpoint/webhookTestEndpoint.js"
import { webhookUpdateEndpoint } from "../src/webhook/endpoint/webhookUpdateEndpoint.js"

const cases: { endpoint: PorkbunEndpoint; input: Record<string, unknown> }[] = [
  { endpoint: webhookEventTypeListEndpoint, input: {} },
  { endpoint: webhookListEndpoint, input: {} },
  { endpoint: webhookGetEndpoint, input: { id: 1 } },
  { endpoint: webhookCreateEndpoint, input: { url: "https://example.com/webhook" } },
  { endpoint: webhookUpdateEndpoint, input: { id: 1 } },
  { endpoint: webhookSecretRotateEndpoint, input: { id: 1 } },
  { endpoint: webhookTestEndpoint, input: { id: 1 } },
  { endpoint: webhookDeleteEndpoint, input: { id: 1 } },
  { endpoint: webhookDeliveryListEndpoint, input: {} },
  { endpoint: webhookDeliveryGetEndpoint, input: { id: 1 } },
  { endpoint: webhookDeliveryResendEndpoint, input: { id: 1 } },
]
for (const { endpoint, input } of cases) {
  test(`live mock validates ${endpoint.op}`, async () => {
    const client = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl, apiKey: "pk1_mock", secretApiKey: "sk1_mock" })
    if (!client.success) throw new Error(client.errorMessage)
    const result = await porkbunEndpointCall(client.data, endpoint, input, { signal: AbortSignal.timeout(30000) })
    if (!result.success) console.error(endpoint.op, result)
    expect(result.success).toBe(true)
  }, 35000)
}
