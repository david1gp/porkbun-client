import { expect, test } from "bun:test"
import { mockEndpointListEndpoint } from "../src/mock/endpoint/mockEndpointListEndpoint.js"
import type { PorkbunEndpoint } from "../src/shared/PorkbunEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

const cases: { endpoint: PorkbunEndpoint; input: Record<string, unknown> }[] = [
  { endpoint: mockEndpointListEndpoint, input: {} },
]
for (const { endpoint, input } of cases) {
  test(`live mock validates ${endpoint.op}`, async () => {
    const client = porkbunClientCreate({
      baseUrl: porkbunMockBaseUrl.replace(/\/mock$/, ""),
      apiKey: "pk1_mock",
      secretApiKey: "sk1_mock",
    })
    if (!client.success) throw new Error(client.errorMessage)
    const result = await porkbunEndpointCall(client.data, endpoint, input, { signal: AbortSignal.timeout(30000) })
    if (!result.success) console.error(endpoint.op, result)
    expect(result.success).toBe(true)
  }, 35000)
}

test("live mock call returns a raw example using a slash-separated endpoint path", async () => {
  const { mockEndpointCall } = await import("../src/mock/api/mockEndpointCall.js")
  const client = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl.replace(/\/mock$/, "") })
  if (!client.success) throw new Error(client.errorMessage)
  const result = await mockEndpointCall(client.data, { path: "domain/listAll", method: "POST" })
  if (!result.success) console.error(result)
  expect(result.success).toBe(true)
}, 35000)
