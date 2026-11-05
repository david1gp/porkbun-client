import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDnsRecordTypeSchema } from "../../shared/schema/porkbunDnsRecordTypeSchema.js"
import { dnsDryRunResponseSchema } from "../schema/dnsDryRunResponseSchema.js"
import { dnsRecordInputSchema } from "../schema/dnsRecordInputSchema.js"

export const dnsRecordCreateEndpoint = porkbunEndpointDefine({
  op: "dnsRecordCreate",
  method: "POST",
  path: "/dns/create/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Create DNS record",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    ...dnsRecordInputSchema.entries,
    type: a.pipe(porkbunDnsRecordTypeSchema, a.description("DNS record type")),
    prio: a.optional(a.pipe(a.number(), a.integer(), a.description("Priority for MX and SRV records"))),
    notes: a.optional(
      a.pipe(
        a.string(),
        a.description("Notes (not served in DNS). Empty string clears existing notes; omit to leave unchanged."),
      ),
    ),
    content: a.pipe(a.string(), a.description("The record value")),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without creating the record"))),
  }),
  responseSchema: a.union([
    dnsDryRunResponseSchema,
    a.looseObject({
      dryRun: a.optional(a.literal(false)),
      status: a.optional(a.string()),
      id: a.optional(a.pipe(a.number(), a.integer())),
      warnings: a.optional(a.array(a.string())),
    }),
  ]),
})
export type DnsRecordCreateInput = PorkbunEndpointInput<typeof dnsRecordCreateEndpoint>
export type DnsRecordCreateResponse = PorkbunEndpointOutput<typeof dnsRecordCreateEndpoint>
