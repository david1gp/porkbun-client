import { expect, test } from "bun:test"
import * as a from "valibot"
import { pricingGet } from "../src/pricing/api/pricingGet.js"
import { pricingGetEndpoint } from "../src/pricing/endpoint/pricingGetEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"
import { accountRetryFetch } from "./accountRetryFetch.js"

test("live mock returns schema-valid public pricing", async () => {
  const client = porkbunClientCreate({ fetch: accountRetryFetch, baseUrl: porkbunMockBaseUrl })
  expect(client.success).toBe(true)
  if (!client.success) return
  const result = await pricingGet(client.data, { tlds: ["com", "io"] }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(a.safeParse(pricingGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
