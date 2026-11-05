import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingDirCreateEndpoint = porkbunEndpointDefine({
  op: "hostingDirCreate",
  method: "POST",
  path: "/hosting/makeDir/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Create a directory (static hosting only)",
  inputSchema: a.object({
    path: a.pipe(a.string(), a.description("path")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), created: a.optional(a.string()) }),
})
export type HostingDirCreateInput = PorkbunEndpointInput<typeof hostingDirCreateEndpoint>
export type HostingDirCreateResponse = PorkbunEndpointOutput<typeof hostingDirCreateEndpoint>
