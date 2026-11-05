import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingWpCredentialDeleteEndpoint = porkbunEndpointDefine({
  op: "hostingWpCredentialDelete",
  method: "POST",
  path: "/hosting/deleteWpCredentials/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Revoke WordPress application passwords (WordPress only)",
  inputSchema: a.object({
    uuid: a.optional(a.pipe(a.string(), a.description("The application password uuid to revoke."))),
    all: a.optional(a.pipe(a.boolean(), a.description("Revoke every application password for the user."))),
    wpUser: a.optional(a.pipe(a.string(), a.description("wpUser"))),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    revoked: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingWpCredentialDeleteInput = PorkbunEndpointInput<typeof hostingWpCredentialDeleteEndpoint>
export type HostingWpCredentialDeleteResponse = PorkbunEndpointOutput<typeof hostingWpCredentialDeleteEndpoint>
