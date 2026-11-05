import { expect, test } from "bun:test"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { aftermarketSearchEndpoint } from "../endpoint/aftermarketSearchEndpoint.js"
import { closeoutBuyEndpoint } from "../endpoint/closeoutBuyEndpoint.js"
import { closeoutGetEndpoint } from "../endpoint/closeoutGetEndpoint.js"
import { closeoutSearchEndpoint } from "../endpoint/closeoutSearchEndpoint.js"
import { marketplaceListEndpoint } from "../endpoint/marketplaceListEndpoint.js"

const cases: { endpoint: PorkbunEndpoint; input: Record<string, unknown> }[] = [
  { endpoint: marketplaceListEndpoint, input: {} },
  { endpoint: aftermarketSearchEndpoint, input: { query: "example" } },
  { endpoint: closeoutSearchEndpoint, input: {} },
  { endpoint: closeoutGetEndpoint, input: { domain: "example.com" } },
  { endpoint: closeoutBuyEndpoint, input: { domain: "example.com", cost: 0, dryRun: true } },
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
