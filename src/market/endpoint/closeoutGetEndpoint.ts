import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const closeoutGetEndpoint = porkbunEndpointDefine({
  op: "closeoutGet",
  method: "GET",
  path: "/closeout/get/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "One closeout, with the binding total",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    available: a.optional(a.boolean()),
    closeout: a.optional(
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
  }),
})
export type CloseoutGetInput = PorkbunEndpointInput<typeof closeoutGetEndpoint>
export type CloseoutGetResponse = PorkbunEndpointOutput<typeof closeoutGetEndpoint>
