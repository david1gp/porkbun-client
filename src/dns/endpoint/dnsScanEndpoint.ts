import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { dnsHistoryRecordSchema } from "../schema/dnsHistoryRecordSchema.js"

export const dnsScanEndpoint = porkbunEndpointDefine({
  op: "dnsScan",
  method: "GET",
  path: "/dns/scan/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Discover the records a domain currently publishes",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    recordCount: a.optional(a.pipe(a.number(), a.integer())),
    records: a.optional(a.array(dnsHistoryRecordSchema)),
  }),
})
export type DnsScanInput = PorkbunEndpointInput<typeof dnsScanEndpoint>
export type DnsScanResponse = PorkbunEndpointOutput<typeof dnsScanEndpoint>
