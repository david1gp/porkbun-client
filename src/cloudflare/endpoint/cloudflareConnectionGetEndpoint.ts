import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const cloudflareConnectionGetEndpoint = porkbunEndpointDefine({
  op: "cloudflareConnectionGet",
  method: "GET",
  path: "/cloudflare/getConnection",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Check the Cloudflare account connection (poll target)",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    connected: a.optional(a.boolean()),
    connectUrl: a.optional(a.string()),
    nextStep: a.optional(a.string()),
  }),
})
export type CloudflareConnectionGetInput = PorkbunEndpointInput<typeof cloudflareConnectionGetEndpoint>
export type CloudflareConnectionGetResponse = PorkbunEndpointOutput<typeof cloudflareConnectionGetEndpoint>
