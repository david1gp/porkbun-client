import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const cloudflareDisconnectEndpoint = porkbunEndpointDefine({
  op: "cloudflareDisconnect",
  method: "POST",
  path: "/cloudflare/disconnect",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Remove the stored Cloudflare connection",
  inputSchema: a.object({ dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    dryRun: a.optional(a.boolean()),
  }),
})
export type CloudflareDisconnectInput = PorkbunEndpointInput<typeof cloudflareDisconnectEndpoint>
export type CloudflareDisconnectResponse = PorkbunEndpointOutput<typeof cloudflareDisconnectEndpoint>
