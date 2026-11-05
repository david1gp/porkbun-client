import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookEndpointSchema } from "../schema/webhookEndpointSchema.js"
export const webhookListEndpoint = porkbunEndpointDefine({
  op: "webhookList",
  method: "GET",
  path: "/webhook/list",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List webhook endpoints",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    endpoints: a.optional(a.array(webhookEndpointSchema)),
  }),
})
export type WebhookListInput = PorkbunEndpointInput<typeof webhookListEndpoint>
export type WebhookListResponse = PorkbunEndpointOutput<typeof webhookListEndpoint>
