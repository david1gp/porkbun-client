import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { domainContactSchema } from "../schema/domainContactSchema.js"

export const domainContactListEndpoint = porkbunEndpointDefine({
  op: "domainContactList",
  method: "GET",
  path: "/domain/getContacts/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get domain contacts",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    contacts: a.optional(
      a.looseObject({
        registrant: a.optional(domainContactSchema),
        admin: a.optional(domainContactSchema),
        tech: a.optional(domainContactSchema),
        billing: a.optional(domainContactSchema),
      }),
    ),
  }),
})
export type DomainContactListInput = PorkbunEndpointInput<typeof domainContactListEndpoint>
export type DomainContactListResponse = PorkbunEndpointOutput<typeof domainContactListEndpoint>
