import { expect, test } from "bun:test"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { mockEndpointListEndpoint } from "../endpoint/mockEndpointListEndpoint.js"

const cases: { endpoint: PorkbunEndpoint; input: Record<string, unknown> }[] = [
  { endpoint: mockEndpointListEndpoint, input: {} },
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
