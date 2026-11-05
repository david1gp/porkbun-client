import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingStagingGateSetEndpoint = porkbunEndpointDefine({
  op: "hostingStagingGateSet",
  method: "POST",
  path: "/hosting/setStagingGate/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Set staging password protection",
  inputSchema: a.object({
    enabled: a.optional(a.pipe(a.boolean(), a.description("enabled"))),
    password: a.optional(a.pipe(a.string(), a.description("4-64 characters."))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    passwordProtection: a.optional(
      a.looseObject({ enabled: a.optional(a.boolean()), password: a.optional(a.string()) }),
    ),
    message: a.optional(a.string()),
  }),
})
export type HostingStagingGateSetInput = PorkbunEndpointInput<typeof hostingStagingGateSetEndpoint>
export type HostingStagingGateSetResponse = PorkbunEndpointOutput<typeof hostingStagingGateSetEndpoint>
