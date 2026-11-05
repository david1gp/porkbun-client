import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { dnsDryRunResponseSchema } from "../schema/dnsDryRunResponseSchema.js"

export const dnsHistoryRestoreEndpoint = porkbunEndpointDefine({
  op: "dnsHistoryRestore",
  method: "POST",
  path: "/dns/restore/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Restore a zone to a previous state",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    snapshotId: a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description("The restore point to go back to, from GET /dns/history/{domain}."),
    ),
    prune: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "Also delete live records that are not in the restore point. Default false, which only adds back what is missing.",
        ),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Report what would change without changing anything."))),
  }),
  responseSchema: a.union([
    dnsDryRunResponseSchema,
    a.looseObject({
      dryRun: a.optional(a.literal(false)),
      warnings: a.optional(a.array(a.string())),
      status: a.optional(a.string()),
      domain: a.optional(a.string()),
      restoredFrom: a.optional(a.pipe(a.number(), a.integer())),
      previousStateSavedAs: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
      restored: a.optional(a.pipe(a.number(), a.integer())),
      removed: a.optional(a.pipe(a.number(), a.integer())),
      failed: a.optional(
        a.array(
          a.looseObject({ name: a.optional(a.string()), type: a.optional(a.string()), reason: a.optional(a.string()) }),
        ),
      ),
    }),
  ]),
})
export type DnsHistoryRestoreInput = PorkbunEndpointInput<typeof dnsHistoryRestoreEndpoint>
export type DnsHistoryRestoreResponse = PorkbunEndpointOutput<typeof dnsHistoryRestoreEndpoint>
