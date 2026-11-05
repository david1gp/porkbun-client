import { expect, test } from "bun:test"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { webhookCreateEndpoint } from "../endpoint/webhookCreateEndpoint.js"
import { webhookDeleteEndpoint } from "../endpoint/webhookDeleteEndpoint.js"
import { webhookDeliveryGetEndpoint } from "../endpoint/webhookDeliveryGetEndpoint.js"
import { webhookDeliveryListEndpoint } from "../endpoint/webhookDeliveryListEndpoint.js"
import { webhookDeliveryResendEndpoint } from "../endpoint/webhookDeliveryResendEndpoint.js"
import { webhookEventTypeListEndpoint } from "../endpoint/webhookEventTypeListEndpoint.js"
import { webhookGetEndpoint } from "../endpoint/webhookGetEndpoint.js"
import { webhookListEndpoint } from "../endpoint/webhookListEndpoint.js"
import { webhookSecretRotateEndpoint } from "../endpoint/webhookSecretRotateEndpoint.js"
import { webhookTestEndpoint } from "../endpoint/webhookTestEndpoint.js"
import { webhookUpdateEndpoint } from "../endpoint/webhookUpdateEndpoint.js"

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
  test(`${endpoint.op} builds the documented request`, async () => {
    const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
    await porkbunEndpointCall(client, endpoint, input)
    expect(calls.length).toBe(1)
    expect(calls[0]!.init?.method).toBe(endpoint.method)
    let expected = endpoint.path
    for (const [key, value] of Object.entries(input))
      expected = expected.replace(`{${key}}`, encodeURIComponent(String(value)))
    expect(new URL(calls[0]!.url).pathname).toBe(`/api/json/v3${expected}`)
  })
}
