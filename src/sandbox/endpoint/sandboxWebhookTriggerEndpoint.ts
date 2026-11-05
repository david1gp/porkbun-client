import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const sandboxWebhookTriggerEndpoint = porkbunEndpointDefine({
  op: "sandboxWebhookTrigger",
  method: "POST",
  path: "/sandbox/triggerWebhook",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Sandbox: fire a sample webhook event",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    event: a.optional(a.string()),
    data: a.optional(a.looseObject({})),
    endpointsRegistered: a.optional(a.pipe(a.number(), a.integer())),
    message: a.optional(a.string()),
    sandbox: a.optional(a.boolean()),
  }),
})
export type SandboxWebhookTriggerInput = PorkbunEndpointInput<typeof sandboxWebhookTriggerEndpoint>
export type SandboxWebhookTriggerResponse = PorkbunEndpointOutput<typeof sandboxWebhookTriggerEndpoint>
