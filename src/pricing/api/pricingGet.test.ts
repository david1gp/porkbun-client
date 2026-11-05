import { expect, test } from "bun:test"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { pricingGet } from "./pricingGet.js"

test("pricingGet sends public filters and parses TLD coupon data", async () => {
  const response = {
    status: "SUCCESS",
    pricing: {
      com: {
        registration: "9.73",
        coupons: {
          registration: { code: "SAVE", max_per_user: 1, first_year_only: "yes" as const, type: "amount", amount: 2 },
        },
      },
    },
    unsupported: ["nope"],
  }
  const { client, calls } = porkbunTestClient(response)
  const result = await pricingGet(client, { tlds: ["com", "nope"] })
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(result.data).toEqual(response)
  expect(calls[0]!.url.endsWith("/pricing/get")).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ tlds: ["com", "nope"] })
})

test("pricingGet rejects invalid coupon fields", async () => {
  const { client } = porkbunTestClient({
    pricing: { com: { coupons: { registration: { first_year_only: "maybe" } } } },
  })
  expect((await pricingGet(client)).success).toBe(false)
})
