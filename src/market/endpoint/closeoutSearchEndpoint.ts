import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const closeoutSearchEndpoint = porkbunEndpointDefine({
  op: "closeoutSearch",
  method: "GET",
  path: "/closeout/search",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Search expired-domain closeouts",
  inputSchema: a.object({
    query: a.optional(a.pipe(a.string(), a.description("Keyword match on the domain name."))),
    tld: a.optional(
      a.pipe(a.string(), a.description("Single TLD, with or without the leading dot. Omit to search all.")),
    ),
    nameLength: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Exact SLD character count."))),
    ageMin: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description("Minimum domain age in years. Pair with sortName=registrationDate to find aged names."),
      ),
    ),
    ageMax: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Maximum domain age in years."))),
    priceMin: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description(
          "Minimum closeout price, integer US cents. Converted to whole dollars for the provider, rounding outward so the range never excludes an item inside it.",
        ),
      ),
    ),
    priceMax: a.optional(
      a.pipe(a.pipe(a.number(), a.integer()), a.description("Maximum closeout price, integer US cents.")),
    ),
    sortName: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "One of: domain, endTime, price, revenue, visitors, inboundLinks, registrationDate. Ascending on registrationDate means oldest registration first, which is how you find aged names. Ascending on revenue",
        ),
      ),
    ),
    sortDirection: a.optional(a.pipe(a.string(), a.description("`asc` or `desc`."))),
    start: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Offset for paging. Default 0."))),
    limit: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Rows per page, 1-500. Default 100."))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    count: a.optional(a.pipe(a.number(), a.integer())),
    totalAvailable: a.optional(a.pipe(a.number(), a.integer())),
    start: a.optional(a.pipe(a.number(), a.integer())),
    limit: a.optional(a.pipe(a.number(), a.integer())),
    closeouts: a.optional(
      a.array(
        a.looseObject({
          closeoutId: a.optional(a.pipe(a.number(), a.integer())),
          domain: a.optional(a.string()),
          tld: a.optional(a.string()),
          price: a.optional(a.pipe(a.number(), a.integer())),
          providerRenewalPrice: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          renewalPrice: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          totalPrice: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          localDomain: a.optional(a.nullable(a.boolean())),
          age: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          registrationDate: a.optional(a.nullable(a.string())),
          endTime: a.optional(a.nullable(a.string())),
          nameLength: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          isIdn: a.optional(a.boolean()),
          estibotAppraisal: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          monthlyVisitors: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          inboundLinks: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          expiredRevenue: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          otherTldCount: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        }),
      ),
    ),
  }),
})
export type CloseoutSearchInput = PorkbunEndpointInput<typeof closeoutSearchEndpoint>
export type CloseoutSearchResponse = PorkbunEndpointOutput<typeof closeoutSearchEndpoint>
