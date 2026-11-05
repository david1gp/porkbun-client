import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookDeliverySchema } from "../schema/webhookDeliverySchema.js"
export const webhookDeliveryResendEndpoint = porkbunEndpointDefine({
  op: "webhookDeliveryResend",
  method: "POST",
  path: "/webhook/resend",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Resend a delivery",
  inputSchema: a.object({ id: a.pipe(a.pipe(a.number(), a.integer()), a.description("Endpoint id.")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    delivery: a.optional(webhookDeliverySchema),
    message: a.optional(a.string()),
  }),
})
export type WebhookDeliveryResendInput = PorkbunEndpointInput<typeof webhookDeliveryResendEndpoint>
export type WebhookDeliveryResendResponse = PorkbunEndpointOutput<typeof webhookDeliveryResendEndpoint>
