import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { dnsRecordSchema } from "../schema/dnsRecordSchema.js"

export const dnsRecordListEndpoint = porkbunEndpointDefine({
  op: "dnsRecordList",
  method: "POST",
  path: "/dns/retrieve/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Retrieve all DNS records",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.string(),
    cloudflare: a.optional(a.picklist(["enabled", "disabled"])),
    records: a.array(dnsRecordSchema),
  }),
})
export type DnsRecordListInput = PorkbunEndpointInput<typeof dnsRecordListEndpoint>
export type DnsRecordListResponse = PorkbunEndpointOutput<typeof dnsRecordListEndpoint>
