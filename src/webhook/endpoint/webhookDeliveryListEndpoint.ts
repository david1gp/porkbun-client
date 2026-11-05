import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookDeliverySchema } from "../schema/webhookDeliverySchema.js"
export const webhookDeliveryListEndpoint = porkbunEndpointDefine({
  op: "webhookDeliveryList",
  method: "GET",
  path: "/webhook/deliveries",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List webhook deliveries",
  inputSchema: a.object({
    endpointId: a.optional(
      a.pipe(a.pipe(a.number(), a.integer()), a.description("Only deliveries for this endpoint.")),
    ),
    status: a.optional(
      a.pipe(a.picklist(["PENDING", "PROCESSING", "DELIVERED", "FAILED"]), a.description("Filter by delivery status.")),
    ),
    start: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Pagination offset (default 0)."))),
    limit: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Page size, 1-200 (default 50)."))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    deliveries: a.optional(a.array(webhookDeliverySchema)),
    total: a.optional(a.pipe(a.number(), a.integer())),
    start: a.optional(a.pipe(a.number(), a.integer())),
    limit: a.optional(a.pipe(a.number(), a.integer())),
    message: a.optional(a.string()),
  }),
})
export type WebhookDeliveryListInput = PorkbunEndpointInput<typeof webhookDeliveryListEndpoint>
export type WebhookDeliveryListResponse = PorkbunEndpointOutput<typeof webhookDeliveryListEndpoint>
