import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const dnssecRecordListEndpoint = porkbunEndpointDefine({
  op: "dnssecRecordList",
  method: "POST",
  path: "/dns/getDnssecRecords/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get DNSSEC records",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    records: a.optional(
      a.record(
        a.string(),
        a.looseObject({
          keyTag: a.optional(a.string()),
          alg: a.optional(a.string()),
          digestType: a.optional(a.string()),
          digest: a.optional(a.string()),
          pubKey: a.optional(a.string()),
        }),
      ),
    ),
  }),
})
export type DnssecRecordListInput = PorkbunEndpointInput<typeof dnssecRecordListEndpoint>
export type DnssecRecordListResponse = PorkbunEndpointOutput<typeof dnssecRecordListEndpoint>
