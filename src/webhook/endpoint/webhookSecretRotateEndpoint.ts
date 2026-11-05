import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookEndpointSchema } from "../schema/webhookEndpointSchema.js"
export const webhookSecretRotateEndpoint = porkbunEndpointDefine({
  op: "webhookSecretRotate",
  method: "POST",
  path: "/webhook/rotateSecret",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Rotate the signing secret",
  inputSchema: a.object({ id: a.pipe(a.pipe(a.number(), a.integer()), a.description("Endpoint id.")) }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), endpoint: a.optional(webhookEndpointSchema) }),
})
export type WebhookSecretRotateInput = PorkbunEndpointInput<typeof webhookSecretRotateEndpoint>
export type WebhookSecretRotateResponse = PorkbunEndpointOutput<typeof webhookSecretRotateEndpoint>
