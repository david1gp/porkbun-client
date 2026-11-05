import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainNameserverUpdateEndpoint = porkbunEndpointDefine({
  op: "domainNameserverUpdate",
  method: "POST",
  path: "/domain/updateNs/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update nameservers",
  inputSchema: a.object({
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without applying changes"))),
    ns: a.pipe(a.array(a.string()), a.description("Ordered array of nameserver hostnames")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    warnings: a.optional(a.array(a.string())),
    status: a.picklist(["SUCCESS", "ERROR"]),
    message: a.optional(a.string()),
    code: a.optional(a.string()),
  }),
})
export type DomainNameserverUpdateInput = PorkbunEndpointInput<typeof domainNameserverUpdateEndpoint>
export type DomainNameserverUpdateResponse = PorkbunEndpointOutput<typeof domainNameserverUpdateEndpoint>
