import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const marketplaceListEndpoint = porkbunEndpointDefine({
  op: "marketplaceList",
  method: "POST",
  path: "/marketplace/getAll",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List marketplace domains",
  inputSchema: a.object({
    start: a.optional(
      a.pipe(a.pipe(a.number(), a.integer()), a.description("Pagination offset (unfiltered mode only). Default 0.")),
    ),
    limit: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer(), a.maxValue(5000)),
        a.description("Number of domains to return (unfiltered mode only). Default 1000, max 5000."),
      ),
    ),
    query: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Search string. Each space-separated term filters by SLD substring. Prefix a term with `-` to exclude it.",
        ),
      ),
    ),
    tlds: a.optional(
      a.pipe(a.array(a.string()), a.description("Filter to listings under these TLDs (without the leading dot).")),
    ),
    sldLengthMin: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description("Filter to listings whose SLD has at least this many characters."),
      ),
    ),
    sldLengthMax: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description("Filter to listings whose SLD has at most this many characters."),
      ),
    ),
    sortName: a.optional(
      a.pipe(
        a.picklist(["domain", "tld", "price", "sld_length"]),
        a.description(
          "Field to sort filtered results by. Default `sld_length` ascending when `query` is set, otherwise `create_date` descending.",
        ),
      ),
    ),
    sortDirection: a.optional(
      a.pipe(a.picklist(["asc", "desc"]), a.description("Sort direction. Defaults vary by `sortName`.")),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    count: a.optional(a.pipe(a.number(), a.integer())),
    filtered: a.optional(a.boolean()),
    domains: a.optional(
      a.array(
        a.looseObject({
          create_date: a.optional(a.string()),
          domain: a.optional(a.string()),
          tld: a.optional(a.string()),
          sld_length: a.optional(a.pipe(a.number(), a.integer())),
          price: a.optional(a.number()),
        }),
      ),
    ),
  }),
})
export type MarketplaceListInput = PorkbunEndpointInput<typeof marketplaceListEndpoint>
export type MarketplaceListResponse = PorkbunEndpointOutput<typeof marketplaceListEndpoint>
