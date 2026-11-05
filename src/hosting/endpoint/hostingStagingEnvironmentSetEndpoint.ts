import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingStagingEnvironmentSetEndpoint = porkbunEndpointDefine({
  op: "hostingStagingEnvironmentSet",
  method: "POST",
  path: "/hosting/setStagingEnvironment/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Set the staging environment type",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    type: a.pipe(a.picklist(["staging", "production"]), a.description("type")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    operation: a.optional(a.looseObject({ type: a.optional(a.string()), state: a.optional(a.string()) })),
    message: a.optional(a.string()),
  }),
})
export type HostingStagingEnvironmentSetInput = PorkbunEndpointInput<typeof hostingStagingEnvironmentSetEndpoint>
export type HostingStagingEnvironmentSetResponse = PorkbunEndpointOutput<typeof hostingStagingEnvironmentSetEndpoint>
