import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { webhookEndpointSchema } from "../schema/webhookEndpointSchema.js"
export const webhookCreateEndpoint = porkbunEndpointDefine({
  op: "webhookCreate",
  method: "POST",
  path: "/webhook/create",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Create a webhook endpoint",
  inputSchema: a.object({
    url: a.pipe(
      a.string(),
      a.description(
        "HTTPS endpoint that receives the signed POST. Port 443 only, and the hostname must resolve to a public internet address \u2014 private/loopback/reserved targets are refused.",
      ),
    ),
    events: a.optional(
      a.pipe(
        a.array(a.string()),
        a.description(
          'Event types to subscribe to. Omit, or pass ["*"], for all events. Prefix wildcards like "dns.*" are allowed.',
        ),
      ),
    ),
  }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), endpoint: a.optional(webhookEndpointSchema) }),
})
export type WebhookCreateInput = PorkbunEndpointInput<typeof webhookCreateEndpoint>
export type WebhookCreateResponse = PorkbunEndpointOutput<typeof webhookCreateEndpoint>
