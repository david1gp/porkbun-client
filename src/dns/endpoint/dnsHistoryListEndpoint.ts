import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const dnsHistoryListEndpoint = porkbunEndpointDefine({
  op: "dnsHistoryList",
  method: "GET",
  path: "/dns/history/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List restore points for a zone",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    restorePoints: a.optional(
      a.array(
        a.looseObject({
          id: a.optional(a.pipe(a.number(), a.integer())),
          takenAt: a.optional(a.string()),
          reason: a.optional(a.string()),
          source: a.optional(a.string()),
          recordCount: a.optional(a.pipe(a.number(), a.integer())),
          matchesLive: a.optional(a.boolean()),
        }),
      ),
    ),
  }),
})
export type DnsHistoryListInput = PorkbunEndpointInput<typeof dnsHistoryListEndpoint>
export type DnsHistoryListResponse = PorkbunEndpointOutput<typeof dnsHistoryListEndpoint>
