import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingBackupDeleteEndpoint = porkbunEndpointDefine({
  op: "hostingBackupDelete",
  method: "POST",
  path: "/hosting/deleteBackup/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Delete an on-demand backup",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    staging: a.optional(
      a.pipe(a.boolean(), a.description("true: act on the site's staging copy instead of the live site.")),
    ),
    id: a.pipe(a.string(), a.description("id")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingBackupDeleteInput = PorkbunEndpointInput<typeof hostingBackupDeleteEndpoint>
export type HostingBackupDeleteResponse = PorkbunEndpointOutput<typeof hostingBackupDeleteEndpoint>
