import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainGetEndpoint = porkbunEndpointDefine({
  op: "domainGet",
  method: "GET",
  path: "/domain/get/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get a single domain",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("Fully qualified domain name in the authenticated account.")),
    includeLabels: a.optional(
      a.pipe(a.picklist(["yes", "no"]), a.description("Return label metadata. Defaults to no.")),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(
      a.looseObject({
        domain: a.optional(a.string()),
        status: a.optional(a.string()),
        tld: a.optional(a.string()),
        createDate: a.optional(a.string()),
        expireDate: a.optional(a.string()),
        securityLock: a.optional(a.pipe(a.number(), a.integer())),
        whoisPrivacy: a.optional(a.pipe(a.number(), a.integer())),
        autoRenew: a.optional(a.pipe(a.number(), a.integer())),
        apiAccess: a.optional(a.pipe(a.number(), a.integer())),
        notLocal: a.optional(a.pipe(a.number(), a.integer())),
      }),
    ),
  }),
})
export type DomainGetInput = PorkbunEndpointInput<typeof domainGetEndpoint>
export type DomainGetResponse = PorkbunEndpointOutput<typeof domainGetEndpoint>
