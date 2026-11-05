import { expect, test } from "bun:test"
import * as a from "valibot"
import { linkInBioLinkResponseSchema } from "../schema/linkInBioLinkResponseSchema.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

test("spec component examples parse while link enums remain checked", () => {
  const link = { id: 1292105, type: "link", title: "Shop my store", url: "https://example.com/shop" }
  expect(a.safeParse(linkInBioLinkResponseSchema, { status: "SUCCESS", link }).success).toBe(true)
  expect(
    a.safeParse(linkInBioResponseSchema, {
      status: "SUCCESS",
      linkInBio: { domain: "example.com", delivery: "domain", links: [link] },
    }).success,
  ).toBe(true)
  expect(a.safeParse(linkInBioLinkResponseSchema, { link: { ...link, type: "invalid" } }).success).toBe(false)
})
