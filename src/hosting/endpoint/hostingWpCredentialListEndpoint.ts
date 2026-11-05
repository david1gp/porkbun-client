import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingWpCredentialListEndpoint = porkbunEndpointDefine({
  op: "hostingWpCredentialList",
  method: "GET",
  path: "/hosting/getWpCredentials/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List WordPress application passwords (WordPress only)",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    wpUser: a.optional(a.pipe(a.string(), a.description("wpUser"))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    wpUser: a.optional(a.string()),
    credentials: a.optional(a.array(a.record(a.string(), a.unknown()))),
  }),
})
export type HostingWpCredentialListInput = PorkbunEndpointInput<typeof hostingWpCredentialListEndpoint>
export type HostingWpCredentialListResponse = PorkbunEndpointOutput<typeof hostingWpCredentialListEndpoint>
