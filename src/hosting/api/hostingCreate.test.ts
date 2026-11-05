import { expect, test } from "bun:test"
import * as a from "valibot"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { hostingCreateEndpoint } from "../endpoint/hostingCreateEndpoint.js"
import { hostingCreate } from "./hostingCreate.js"

const purchase = { domain: "example.com", acknowledgedCost: 300, agreeToTerms: "yes" as const }
for (const sku of [
  "PIXIESECURESTATICM2",
  "PIXIESECURESTATICY2",
  "CLOUDWORDPRESSM1",
  "CLOUDWORDPRESSY1",
  "PIXIELINKSM1",
  "PIXIELINKSY1",
] as const) {
  test(`hosting create supports the documented product SKU ${sku}`, async () => {
    const response = {
      status: "SUCCESS",
      dryRun: true,
      wouldSucceed: true,
      domain: "example.com",
      sku,
      trial: true,
      charged: 0,
      cost: { amount: 300, formatted: "$3.00", interval: "monthly" },
    }
    const { client, calls } = porkbunTestClient(response)
    const result = await hostingCreate(client, { ...purchase, sku, dryRun: true })
    expect(result).toEqual({ success: true, data: response })
    expect(calls[0]!.body).toEqual({
      acknowledgedCost: 300,
      agreeToTerms: "yes",
      sku,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    })
  })
}
test("hosting create rejects invalid SKU, consent and fractional cost before fetching", async () => {
  const { client, calls } = porkbunTestClient()
  expect((await hostingCreate(client, { ...purchase, sku: "not-a-plan" as "PIXIESECURESTATICM2" })).success).toBe(false)
  expect(
    (await hostingCreate(client, { ...purchase, sku: "PIXIESECURESTATICM2", acknowledgedCost: 3.5 })).success,
  ).toBe(false)
  expect(
    a.safeParse(hostingCreateEndpoint.inputSchema, { ...purchase, sku: "PIXIESECURESTATICM2", agreeToTerms: "no" })
      .success,
  ).toBe(false)
  expect(calls).toHaveLength(0)
})
test("hosting preview checks cost as a hosting cost object, not registration cents", () => {
  const preview = { status: "SUCCESS", dryRun: true, wouldSucceed: true, cost: { amount: 1200 } }
  expect(a.safeParse(hostingCreateEndpoint.responseSchema, preview).success).toBe(true)
  expect(a.safeParse(hostingCreateEndpoint.responseSchema, { ...preview, cost: 1200 }).success).toBe(false)
  expect(a.safeParse(hostingCreateEndpoint.responseSchema, { ...preview, wouldSucceed: "yes" }).success).toBe(false)
})
