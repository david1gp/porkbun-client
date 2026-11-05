import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainNameserverListEndpoint = porkbunEndpointDefine({
  op: "domainNameserverList",
  method: "POST",
  path: "/domain/getNs/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get nameservers",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), ns: a.optional(a.array(a.string())) }),
})
export type DomainNameserverListInput = PorkbunEndpointInput<typeof domainNameserverListEndpoint>
export type DomainNameserverListResponse = PorkbunEndpointOutput<typeof domainNameserverListEndpoint>
