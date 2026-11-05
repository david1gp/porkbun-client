import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const sslBundleGetEndpoint = porkbunEndpointDefine({
  op: "sslBundleGet",
  method: "POST",
  path: "/ssl/retrieve/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Retrieve SSL bundle",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    certificatechain: a.optional(a.string()),
    privatekey: a.optional(a.string()),
    publickey: a.optional(a.string()),
  }),
})
export type SslBundleGetInput = PorkbunEndpointInput<typeof sslBundleGetEndpoint>
export type SslBundleGetResponse = PorkbunEndpointOutput<typeof sslBundleGetEndpoint>
