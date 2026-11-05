import { expect, test } from "bun:test"
import * as a from "valibot"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"
import { urlForwardCreate } from "../src/urlForward/api/urlForwardCreate.js"
import { urlForwardDelete } from "../src/urlForward/api/urlForwardDelete.js"
import { urlForwardList } from "../src/urlForward/api/urlForwardList.js"
import { urlForwardCreateEndpoint } from "../src/urlForward/endpoint/urlForwardCreateEndpoint.js"
import { urlForwardDeleteEndpoint } from "../src/urlForward/endpoint/urlForwardDeleteEndpoint.js"
import { urlForwardListEndpoint } from "../src/urlForward/endpoint/urlForwardListEndpoint.js"

const created = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl, apiKey: "pk1_mock", secretApiKey: "sk1_mock" })
if (!created.success) throw new Error(created.errorMessage)
const client = created.data
test("live mock validates urlForwardList", async () => {
  const result = await urlForwardList(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(urlForwardListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates urlForwardCreate", async () => {
  const result = await urlForwardCreate(
    client,
    {
      domain: "example.com",
      location: "https://destination.example.com",
      type: "temporary",
      includePath: "yes",
      wildcard: "yes",
    },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(urlForwardCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates urlForwardDelete", async () => {
  const result = await urlForwardDelete(
    client,
    { domain: "example.com", id: "12345" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(urlForwardDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
