import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const webhookTestEndpoint = porkbunEndpointDefine({
  op: "webhookTest",
  method: "POST",
  path: "/webhook/test",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Send a test event",
  inputSchema: a.object({ id: a.pipe(a.pipe(a.number(), a.integer()), a.description("Endpoint id.")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    eventId: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type WebhookTestInput = PorkbunEndpointInput<typeof webhookTestEndpoint>
export type WebhookTestResponse = PorkbunEndpointOutput<typeof webhookTestEndpoint>
