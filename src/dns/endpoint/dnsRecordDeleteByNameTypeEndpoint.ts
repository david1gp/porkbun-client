import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { dnsDryRunResponseSchema } from "../schema/dnsDryRunResponseSchema.js"

export const dnsRecordDeleteByNameTypeEndpoint = porkbunEndpointDefine({
  op: "dnsRecordDeleteByNameType",
  method: "POST",
  path: "/dns/deleteByNameType/{domain}/{type}/{subdomain?}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Delete DNS records by name and type",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    type: a.pipe(a.string(), a.description("type")),
    subdomain: a.optional(
      a.pipe(a.string(), a.description("Subdomain portion only. Omit or leave empty for root domain records.")),
    ),
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
export type DnsRecordDeleteByNameTypeInput = PorkbunEndpointInput<typeof dnsRecordDeleteByNameTypeEndpoint>
export type DnsRecordDeleteByNameTypeResponse = PorkbunEndpointOutput<typeof dnsRecordDeleteByNameTypeEndpoint>
