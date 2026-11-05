import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookDeliverySchema } from "../schema/webhookDeliverySchema.js"
export const webhookDeliveryGetEndpoint = porkbunEndpointDefine({
  op: "webhookDeliveryGet",
  method: "GET",
  path: "/webhook/delivery/{id}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get a webhook delivery",
  inputSchema: a.object({ id: a.pipe(a.pipe(a.number(), a.integer()), a.description("id")) }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), delivery: a.optional(webhookDeliverySchema) }),
})
export type WebhookDeliveryGetInput = PorkbunEndpointInput<typeof webhookDeliveryGetEndpoint>
export type WebhookDeliveryGetResponse = PorkbunEndpointOutput<typeof webhookDeliveryGetEndpoint>
