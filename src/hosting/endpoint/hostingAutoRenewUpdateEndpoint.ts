import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingAutoRenewUpdateEndpoint = porkbunEndpointDefine({
  op: "hostingAutoRenewUpdate",
  method: "POST",
  path: "/hosting/updateAutoRenew/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Turn hosting auto-renew on or off",
  inputSchema: a.object({
    autoRenew: a.pipe(
      a.boolean(),
      a.description("true to renew automatically, false to let the plan end at expireDate."),
    ),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    product: a.optional(a.string()),
    autoRenew: a.optional(a.boolean()),
    isTrial: a.optional(a.boolean()),
    expireDate: a.optional(a.string()),
    cost: a.optional(
      a.looseObject({
        amount: a.optional(a.pipe(a.number(), a.integer())),
        formatted: a.optional(a.string()),
        interval: a.optional(a.string()),
      }),
    ),
    message: a.optional(a.string()),
  }),
})
export type HostingAutoRenewUpdateInput = PorkbunEndpointInput<typeof hostingAutoRenewUpdateEndpoint>
export type HostingAutoRenewUpdateResponse = PorkbunEndpointOutput<typeof hostingAutoRenewUpdateEndpoint>
