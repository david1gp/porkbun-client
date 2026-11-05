import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { dnsDryRunResponseSchema } from "../schema/dnsDryRunResponseSchema.js"
import { dnsRecordInputSchema } from "../schema/dnsRecordInputSchema.js"

export const dnsRecordEditByNameTypeEndpoint = porkbunEndpointDefine({
  op: "dnsRecordEditByNameType",
  method: "POST",
  path: "/dns/editByNameType/{domain}/{type}/{subdomain?}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Edit DNS records by name and type",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    type: a.pipe(a.string(), a.description("type")),
    subdomain: a.optional(
      a.pipe(a.string(), a.description("Subdomain portion only. Omit or leave empty for root domain records.")),
    ),
    ...a.pick(dnsRecordInputSchema, ["content", "ttl", "prio"]).entries,
    content: a.pipe(a.string(), a.description("New record value for all matching records")),
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
export type DnsRecordEditByNameTypeInput = PorkbunEndpointInput<typeof dnsRecordEditByNameTypeEndpoint>
export type DnsRecordEditByNameTypeResponse = PorkbunEndpointOutput<typeof dnsRecordEditByNameTypeEndpoint>
