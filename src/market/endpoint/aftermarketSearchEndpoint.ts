import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const aftermarketSearchEndpoint = porkbunEndpointDefine({
  op: "aftermarketSearch",
  method: "GET",
  path: "/aftermarket/search",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Search domains for sale on the aftermarket",
  inputSchema: a.object({
    query: a.pipe(a.string(), a.description("A keyword or a full domain.")),
    tld: a.optional(a.pipe(a.string(), a.description("Only listings on this TLD, with or without the leading dot."))),
    saleType: a.optional(
      a.pipe(a.picklist(["buy_now", "make_offer", "auction"]), a.description("Only this kind of listing.")),
    ),
    priceMin: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Minimum price, integer US cents."))),
    priceMax: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Maximum price, integer US cents."))),
    limit: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer(), a.maxValue(200)),
        a.description("Listings to return (1-200, default 50). `total` says how many matched."),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    query: a.optional(a.string()),
    exactMatch: a.optional(
      a.nullable(
        a.looseObject({
          domain: a.optional(a.string()),
          tld: a.optional(a.string()),
          price: a.optional(a.pipe(a.number(), a.integer())),
          priceDisplay: a.optional(a.string()),
          priceMeaning: a.optional(a.picklist(["buy_now_price", "minimum_offer", "current_bid"])),
          saleType: a.optional(a.picklist(["buy_now", "make_offer", "auction"])),
          source: a.optional(a.string()),
          fastTransfer: a.optional(a.boolean()),
          buyUrl: a.optional(a.string()),
        }),
      ),
    ),
    listings: a.optional(
      a.array(
        a.looseObject({
          domain: a.optional(a.string()),
          tld: a.optional(a.string()),
          price: a.optional(a.pipe(a.number(), a.integer())),
          priceDisplay: a.optional(a.string()),
          priceMeaning: a.optional(a.picklist(["buy_now_price", "minimum_offer", "current_bid"])),
          saleType: a.optional(a.picklist(["buy_now", "make_offer", "auction"])),
          source: a.optional(a.string()),
          fastTransfer: a.optional(a.boolean()),
          buyUrl: a.optional(a.string()),
        }),
      ),
    ),
    count: a.optional(a.pipe(a.number(), a.integer())),
    total: a.optional(a.pipe(a.number(), a.integer())),
    sourcesUnavailable: a.optional(a.array(a.string())),
    note: a.optional(a.string()),
  }),
})
export type AftermarketSearchInput = PorkbunEndpointInput<typeof aftermarketSearchEndpoint>
export type AftermarketSearchResponse = PorkbunEndpointOutput<typeof aftermarketSearchEndpoint>
