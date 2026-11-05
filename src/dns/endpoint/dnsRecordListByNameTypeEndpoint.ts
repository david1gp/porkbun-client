import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { dnsRecordSchema } from "../schema/dnsRecordSchema.js"

export const dnsRecordListByNameTypeEndpoint = porkbunEndpointDefine({
  op: "dnsRecordListByNameType",
  method: "POST",
  path: "/dns/retrieveByNameType/{domain}/{type}/{subdomain?}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Retrieve DNS records by name and type",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    type: a.pipe(a.string(), a.description("DNS record type (A, AAAA, CNAME, MX, TXT, etc.)")),
    subdomain: a.optional(
      a.pipe(a.string(), a.description("Subdomain portion only. Omit or leave empty for root domain records.")),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.string(),
    cloudflare: a.optional(a.picklist(["enabled", "disabled"])),
    records: a.array(dnsRecordSchema),
  }),
})
export type DnsRecordListByNameTypeInput = PorkbunEndpointInput<typeof dnsRecordListByNameTypeEndpoint>
export type DnsRecordListByNameTypeResponse = PorkbunEndpointOutput<typeof dnsRecordListByNameTypeEndpoint>
