import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingStagingGuardSetEndpoint = porkbunEndpointDefine({
  op: "hostingStagingGuardSet",
  method: "POST",
  path: "/hosting/setStagingGuard/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Block or allow outbound email and API calls from staging",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    blockEmail: a.optional(a.pipe(a.boolean(), a.description("blockEmail"))),
    blockApiRequests: a.optional(a.pipe(a.boolean(), a.description("blockApiRequests"))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    operation: a.optional(a.looseObject({ type: a.optional(a.string()), state: a.optional(a.string()) })),
    message: a.optional(a.string()),
  }),
})
export type HostingStagingGuardSetInput = PorkbunEndpointInput<typeof hostingStagingGuardSetEndpoint>
export type HostingStagingGuardSetResponse = PorkbunEndpointOutput<typeof hostingStagingGuardSetEndpoint>
