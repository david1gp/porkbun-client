import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { dnsDryRunResponseSchema } from "../schema/dnsDryRunResponseSchema.js"
import { dnsRecordInputSchema } from "../schema/dnsRecordInputSchema.js"

export const dnsImportEndpoint = porkbunEndpointDefine({
  op: "dnsImport",
  method: "POST",
  path: "/dns/import/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Bulk-create DNS records (transfer restore)",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    records: a.optional(
      a.pipe(
        a.pipe(a.array(a.object({ ...dnsRecordInputSchema.entries })), a.maxLength(500)),
        a.description(
          "Records to create. Omit to import what a scan discovers. NS and SOA entries are ignored \u2014 they describe the delegation, not the zone contents.",
        ),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate the import without changing the zone"))),
  }),
  responseSchema: a.union([
    dnsDryRunResponseSchema,
    a.looseObject({
      dryRun: a.optional(a.literal(false)),
      status: a.optional(a.string()),
      domain: a.optional(a.string()),
      created: a.optional(a.pipe(a.number(), a.integer())),
      skipped: a.optional(a.pipe(a.number(), a.integer())),
      failed: a.optional(a.pipe(a.number(), a.integer())),
      failures: a.optional(a.array(a.looseObject({}))),
      warnings: a.optional(a.array(a.string())),
    }),
  ]),
})
export type DnsImportInput = PorkbunEndpointInput<typeof dnsImportEndpoint>
export type DnsImportResponse = PorkbunEndpointOutput<typeof dnsImportEndpoint>
