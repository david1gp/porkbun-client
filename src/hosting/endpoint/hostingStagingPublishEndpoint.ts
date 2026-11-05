import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingStagingPublishEndpoint = porkbunEndpointDefine({
  op: "hostingStagingPublish",
  method: "POST",
  path: "/hosting/publishStaging/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Publish staging to the live site",
  inputSchema: a.object({
    // Supported in the operation description, omitted from its request property list.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    operation: a.optional(a.looseObject({ type: a.optional(a.string()), state: a.optional(a.string()) })),
    message: a.optional(a.string()),
  }),
})
export type HostingStagingPublishInput = PorkbunEndpointInput<typeof hostingStagingPublishEndpoint>
export type HostingStagingPublishResponse = PorkbunEndpointOutput<typeof hostingStagingPublishEndpoint>
