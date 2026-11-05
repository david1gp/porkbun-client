import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookEndpointSchema } from "../schema/webhookEndpointSchema.js"
export const webhookUpdateEndpoint = porkbunEndpointDefine({
  op: "webhookUpdate",
  method: "POST",
  path: "/webhook/update",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update a webhook endpoint",
  inputSchema: a.object({
    id: a.pipe(a.pipe(a.number(), a.integer()), a.description("Endpoint id to update.")),
    url: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "HTTPS endpoint that receives the signed POST. Port 443 only, and the hostname must resolve to a public internet address \u2014 private/loopback/reserved targets are refused.",
        ),
      ),
    ),
    events: a.optional(a.pipe(a.array(a.string()), a.description("Replacement event subscription list (optional)."))),
    status: a.optional(
      a.pipe(
        a.picklist(["ACTIVE", "DISABLED"]),
        a.description("Set ACTIVE to resume (also clears the failure counter) or DISABLED to pause (optional)."),
      ),
    ),
  }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), endpoint: a.optional(webhookEndpointSchema) }),
})
export type WebhookUpdateInput = PorkbunEndpointInput<typeof webhookUpdateEndpoint>
export type WebhookUpdateResponse = PorkbunEndpointOutput<typeof webhookUpdateEndpoint>
