import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const webhookEventTypeListEndpoint = porkbunEndpointDefine({
  op: "webhookEventTypeList",
  method: "GET",
  path: "/webhook/eventTypes",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List subscribable event types",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({ status: a.optional(a.string()), eventTypes: a.optional(a.array(a.string())) }),
})
export type WebhookEventTypeListInput = PorkbunEndpointInput<typeof webhookEventTypeListEndpoint>
export type WebhookEventTypeListResponse = PorkbunEndpointOutput<typeof webhookEventTypeListEndpoint>
