import { expect, test } from "bun:test"
import * as a from "valibot"
import { pricingGet } from "../src/pricing/api/pricingGet.js"
import { pricingGetEndpoint } from "../src/pricing/endpoint/pricingGetEndpoint.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

test("live mock returns schema-valid public pricing", async () => {
  const client = porkbunE2eClientCreate()
  expect(client.success).toBe(true)
  if (!client.success) return
  const result = await pricingGet(client.data, { tlds: ["com", "io"] }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(a.safeParse(pricingGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
