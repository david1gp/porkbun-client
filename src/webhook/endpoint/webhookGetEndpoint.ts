import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookEndpointSchema } from "../schema/webhookEndpointSchema.js"
export const webhookGetEndpoint = porkbunEndpointDefine({
  op: "webhookGet",
  method: "GET",
  path: "/webhook/get/{id}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get a webhook endpoint",
  inputSchema: a.object({ id: a.pipe(a.pipe(a.number(), a.integer()), a.description("id")) }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), endpoint: a.optional(webhookEndpointSchema) }),
})
export type WebhookGetInput = PorkbunEndpointInput<typeof webhookGetEndpoint>
export type WebhookGetResponse = PorkbunEndpointOutput<typeof webhookGetEndpoint>
