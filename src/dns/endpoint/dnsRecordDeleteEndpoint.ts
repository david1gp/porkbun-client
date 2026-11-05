import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { dnsDryRunResponseSchema } from "../schema/dnsDryRunResponseSchema.js"

export const dnsRecordDeleteEndpoint = porkbunEndpointDefine({
  op: "dnsRecordDelete",
  method: "POST",
  path: "/dns/delete/{domain}/{id}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Delete DNS record by ID",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    id: a.pipe(a.string(), a.description("Numeric DNS record ID")),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without changing the zone"))),
  }),
  responseSchema: a.union([
    dnsDryRunResponseSchema,
    a.looseObject({
      dryRun: a.optional(a.literal(false)),
      warnings: a.optional(a.array(a.string())),
      status: a.picklist(["SUCCESS", "ERROR"]),
      message: a.optional(a.string()),
      code: a.optional(a.string()),
    }),
  ]),
})
export type DnsRecordDeleteInput = PorkbunEndpointInput<typeof dnsRecordDeleteEndpoint>
export type DnsRecordDeleteResponse = PorkbunEndpointOutput<typeof dnsRecordDeleteEndpoint>
