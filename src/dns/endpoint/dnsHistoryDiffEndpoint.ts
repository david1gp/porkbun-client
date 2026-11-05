import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { dnsHistoryRecordSchema } from "../schema/dnsHistoryRecordSchema.js"

export const dnsHistoryDiffEndpoint = porkbunEndpointDefine({
  op: "dnsHistoryDiff",
  method: "GET",
  path: "/dns/diff/{domain}/{snapshotId}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Compare a restore point with the live zone",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    snapshotId: a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description("A restore point id from GET /dns/history/{domain}."),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    snapshot: a.optional(
      a.looseObject({
        id: a.optional(a.pipe(a.number(), a.integer())),
        takenAt: a.optional(a.string()),
        reason: a.optional(a.string()),
      }),
    ),
    missing: a.optional(a.array(dnsHistoryRecordSchema)),
    extra: a.optional(a.array(dnsHistoryRecordSchema)),
    inSync: a.optional(a.boolean()),
  }),
})
export type DnsHistoryDiffInput = PorkbunEndpointInput<typeof dnsHistoryDiffEndpoint>
export type DnsHistoryDiffResponse = PorkbunEndpointOutput<typeof dnsHistoryDiffEndpoint>
