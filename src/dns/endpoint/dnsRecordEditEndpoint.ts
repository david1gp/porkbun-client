import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDnsRecordTypeSchema } from "../../shared/schema/porkbunDnsRecordTypeSchema.js"
import { dnsDryRunResponseSchema } from "../schema/dnsDryRunResponseSchema.js"
import { dnsRecordInputSchema } from "../schema/dnsRecordInputSchema.js"

export const dnsRecordEditEndpoint = porkbunEndpointDefine({
  op: "dnsRecordEdit",
  method: "POST",
  path: "/dns/edit/{domain}/{id}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Edit DNS record by ID",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    id: a.pipe(a.string(), a.description("Numeric DNS record ID")),
    ...dnsRecordInputSchema.entries,
    type: a.optional(a.pipe(porkbunDnsRecordTypeSchema, a.description("DNS record type"))),
    prio: a.optional(a.pipe(a.number(), a.integer(), a.description("Priority for MX and SRV records"))),
    notes: a.optional(
      a.pipe(
        a.string(),
        a.description("Notes (not served in DNS). Empty string clears existing notes; omit to leave unchanged."),
      ),
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
export type DnsRecordEditInput = PorkbunEndpointInput<typeof dnsRecordEditEndpoint>
export type DnsRecordEditResponse = PorkbunEndpointOutput<typeof dnsRecordEditEndpoint>
