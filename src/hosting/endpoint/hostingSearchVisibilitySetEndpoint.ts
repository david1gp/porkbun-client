import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingSearchVisibilitySetEndpoint = porkbunEndpointDefine({
  op: "hostingSearchVisibilitySet",
  method: "POST",
  path: "/hosting/setSearchVisibility/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Show or hide the site from search engines",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    visible: a.pipe(a.boolean(), a.description("visible")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingSearchVisibilitySetInput = PorkbunEndpointInput<typeof hostingSearchVisibilitySetEndpoint>
export type HostingSearchVisibilitySetResponse = PorkbunEndpointOutput<typeof hostingSearchVisibilitySetEndpoint>
