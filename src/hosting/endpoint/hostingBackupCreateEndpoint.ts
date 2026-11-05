import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingBackupCreateEndpoint = porkbunEndpointDefine({
  op: "hostingBackupCreate",
  method: "POST",
  path: "/hosting/createBackup/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Take an on-demand backup",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    staging: a.optional(
      a.pipe(a.boolean(), a.description("true: act on the site's staging copy instead of the live site.")),
    ),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingBackupCreateInput = PorkbunEndpointInput<typeof hostingBackupCreateEndpoint>
export type HostingBackupCreateResponse = PorkbunEndpointOutput<typeof hostingBackupCreateEndpoint>
