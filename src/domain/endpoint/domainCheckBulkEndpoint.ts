import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainCheckBulkEndpoint = porkbunEndpointDefine({
  op: "domainCheckBulk",
  method: "POST",
  path: "/domain/checkDomain",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Check several domains at once",
  inputSchema: a.object({
    domains: a.pipe(
      a.pipe(a.array(a.string()), a.maxLength(25)),
      a.description('Domains to check, e.g. ["example.com", "example.net"]. Duplicates are removed.'),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    checked: a.optional(a.pipe(a.number(), a.integer())),
    domains: a.optional(a.record(a.string(), a.record(a.string(), a.unknown()))),
    unresolved: a.optional(a.array(a.string())),
    invalid: a.optional(a.array(a.record(a.string(), a.unknown()))),
    limits: a.optional(a.record(a.string(), a.unknown())),
  }),
})
export type DomainCheckBulkInput = PorkbunEndpointInput<typeof domainCheckBulkEndpoint>
export type DomainCheckBulkResponse = PorkbunEndpointOutput<typeof domainCheckBulkEndpoint>
