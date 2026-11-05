import { expect, test } from "bun:test"
import { aftermarketSearchEndpoint } from "../src/market/endpoint/aftermarketSearchEndpoint.js"
import { closeoutBuyEndpoint } from "../src/market/endpoint/closeoutBuyEndpoint.js"
import { closeoutGetEndpoint } from "../src/market/endpoint/closeoutGetEndpoint.js"
import { closeoutSearchEndpoint } from "../src/market/endpoint/closeoutSearchEndpoint.js"
import { marketplaceListEndpoint } from "../src/market/endpoint/marketplaceListEndpoint.js"
import type { PorkbunEndpoint } from "../src/shared/PorkbunEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

const cases: { endpoint: PorkbunEndpoint; input: Record<string, unknown> }[] = [
  { endpoint: marketplaceListEndpoint, input: {} },
  { endpoint: aftermarketSearchEndpoint, input: { query: "example" } },
  { endpoint: closeoutSearchEndpoint, input: {} },
  { endpoint: closeoutGetEndpoint, input: { domain: "example.com" } },
  { endpoint: closeoutBuyEndpoint, input: { domain: "example.com", cost: 0, dryRun: true } },
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
