import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainCheckEndpoint = porkbunEndpointDefine({
  op: "domainCheck",
  method: "POST",
  path: "/domain/checkDomain/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Check domain availability",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.string(),
    response: a.looseObject({
      avail: a.optional(a.picklist(["yes", "no"])),
      type: a.optional(a.string()),
      price: a.optional(a.string()),
      firstYearPromo: a.optional(a.picklist(["yes", "no"])),
      regularPrice: a.optional(a.string()),
      premium: a.optional(a.picklist(["yes", "no"])),
      minDuration: a.optional(a.pipe(a.number(), a.integer())),
      idnLanguages: a.optional(a.array(a.looseObject({ name: a.optional(a.string()), code: a.optional(a.string()) }))),
      inYourAccount: a.optional(a.boolean()),
      aftermarketSearch: a.optional(a.string()),
      note: a.optional(a.string()),
      additional: a.optional(
        a.looseObject({
          renewal: a.optional(
            a.looseObject({
              type: a.optional(a.string()),
              price: a.optional(a.string()),
              regularPrice: a.optional(a.string()),
            }),
          ),
          transfer: a.optional(
            a.looseObject({
              type: a.optional(a.string()),
              price: a.optional(a.string()),
              regularPrice: a.optional(a.string()),
            }),
          ),
        }),
      ),
    }),
    limits: a.optional(
      a.looseObject({
        TTL: a.optional(a.pipe(a.number(), a.integer())),
        limit: a.optional(a.pipe(a.number(), a.integer())),
        used: a.optional(a.pipe(a.number(), a.integer())),
        naturalLanguage: a.optional(a.string()),
      }),
    ),
    ttlRemaining: a.optional(a.pipe(a.number(), a.integer())),
  }),
})
export type DomainCheckInput = PorkbunEndpointInput<typeof domainCheckEndpoint>
export type DomainCheckResponse = PorkbunEndpointOutput<typeof domainCheckEndpoint>
