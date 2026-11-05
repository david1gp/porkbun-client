import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const dnssecRecordDeleteEndpoint = porkbunEndpointDefine({
  op: "dnssecRecordDelete",
  method: "POST",
  path: "/dns/deleteDnssecRecord/{domain}/{keytag}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Delete DNSSEC record",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    keytag: a.pipe(a.string(), a.description("The DNSSEC key tag value")),
  }),
  responseSchema: a.looseObject({
    warnings: a.optional(a.array(a.string())),
    status: a.picklist(["SUCCESS", "ERROR"]),
    message: a.optional(a.string()),
    code: a.optional(a.string()),
  }),
})
export type DnssecRecordDeleteInput = PorkbunEndpointInput<typeof dnssecRecordDeleteEndpoint>
export type DnssecRecordDeleteResponse = PorkbunEndpointOutput<typeof dnssecRecordDeleteEndpoint>
