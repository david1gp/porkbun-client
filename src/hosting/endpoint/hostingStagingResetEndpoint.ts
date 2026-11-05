import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingStagingResetEndpoint = porkbunEndpointDefine({
  op: "hostingStagingReset",
  method: "POST",
  path: "/hosting/resetStaging/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Rebuild the staging site",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    fsId: a.optional(
      a.pipe(a.string(), a.description("Optional: build from this files backup of the live site (with dbId).")),
    ),
    dbId: a.optional(a.pipe(a.string(), a.description("Optional: the database backup to go with fsId."))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    operation: a.optional(a.looseObject({ type: a.optional(a.string()), state: a.optional(a.string()) })),
    message: a.optional(a.string()),
  }),
})
export type HostingStagingResetInput = PorkbunEndpointInput<typeof hostingStagingResetEndpoint>
export type HostingStagingResetResponse = PorkbunEndpointOutput<typeof hostingStagingResetEndpoint>
