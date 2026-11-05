import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { dnsRecordSchema } from "../schema/dnsRecordSchema.js"

export const dnsRecordGetEndpoint = porkbunEndpointDefine({
  op: "dnsRecordGet",
  method: "POST",
  path: "/dns/retrieve/{domain}/{id}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Retrieve DNS record by ID",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    id: a.pipe(a.string(), a.description("Numeric DNS record ID")),
  }),
  responseSchema: a.looseObject({
    status: a.string(),
    cloudflare: a.optional(a.picklist(["enabled", "disabled"])),
    records: a.array(dnsRecordSchema),
  }),
})
export type DnsRecordGetInput = PorkbunEndpointInput<typeof dnsRecordGetEndpoint>
export type DnsRecordGetResponse = PorkbunEndpointOutput<typeof dnsRecordGetEndpoint>
