import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingPhpVersionSetEndpoint = porkbunEndpointDefine({
  op: "hostingPhpVersionSet",
  method: "POST",
  path: "/hosting/setPhpVersion/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Set the PHP version",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    version: a.pipe(a.string(), a.description("version")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingPhpVersionSetInput = PorkbunEndpointInput<typeof hostingPhpVersionSetEndpoint>
export type HostingPhpVersionSetResponse = PorkbunEndpointOutput<typeof hostingPhpVersionSetEndpoint>
