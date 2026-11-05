import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingBackupRestoreEndpoint = porkbunEndpointDefine({
  op: "hostingBackupRestore",
  method: "POST",
  path: "/hosting/restoreBackup/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Restore from a backup",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    staging: a.optional(
      a.pipe(a.boolean(), a.description("true: act on the site's staging copy instead of the live site.")),
    ),
    fsId: a.pipe(a.string(), a.description("A files backup id.")),
    dbId: a.pipe(a.string(), a.description("A database backup id.")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    target: a.optional(a.string()),
    operation: a.optional(
      a.looseObject({
        id: a.optional(a.pipe(a.number(), a.integer())),
        type: a.optional(a.string()),
        state: a.optional(a.string()),
      }),
    ),
    message: a.optional(a.string()),
  }),
})
export type HostingBackupRestoreInput = PorkbunEndpointInput<typeof hostingBackupRestoreEndpoint>
export type HostingBackupRestoreResponse = PorkbunEndpointOutput<typeof hostingBackupRestoreEndpoint>
