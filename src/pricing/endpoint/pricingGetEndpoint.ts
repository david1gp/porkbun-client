import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const pricingGetEndpoint = porkbunEndpointDefine({
  op: "pricingGet",
  method: "POST",
  path: "/pricing/get",
  auth: "none",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Retrieve public domain pricing",
  inputSchema: a.object({
    tld: a.optional(a.pipe(a.string(), a.description("Single TLD to price"))),
    tlds: a.optional(
      a.pipe(
        a.union([a.array(a.string()), a.string()]),
        a.description("TLDs to price, as an array or comma-separated string"),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    unsupported: a.optional(a.array(a.string())),
    pricing: a.optional(
      a.record(
        a.string(),
        a.looseObject({
          registration: a.optional(a.string()),
          renewal: a.optional(a.string()),
          transfer: a.optional(a.string()),
          specialType: a.optional(a.string()),
          coupons: a.optional(
            a.record(
              a.string(),
              a.looseObject({
                code: a.optional(a.string()),
                max_per_user: a.optional(a.pipe(a.number(), a.integer())),
                first_year_only: a.optional(a.picklist(["yes", "no"])),
                type: a.optional(a.string()),
                amount: a.optional(a.number()),
              }),
            ),
          ),
        }),
      ),
    ),
  }),
})
export type PricingGetInput = PorkbunEndpointInput<typeof pricingGetEndpoint>
export type PricingGetResponse = PorkbunEndpointOutput<typeof pricingGetEndpoint>
