import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const webhookDeleteEndpoint = porkbunEndpointDefine({
  op: "webhookDelete",
  method: "POST",
  path: "/webhook/delete",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Delete a webhook endpoint",
  inputSchema: a.object({ id: a.pipe(a.pipe(a.number(), a.integer()), a.description("Endpoint id.")) }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), message: a.optional(a.string()) }),
})
export type WebhookDeleteInput = PorkbunEndpointInput<typeof webhookDeleteEndpoint>
export type WebhookDeleteResponse = PorkbunEndpointOutput<typeof webhookDeleteEndpoint>
