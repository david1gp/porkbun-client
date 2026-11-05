import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type SandboxWebhookTriggerInput,
  type SandboxWebhookTriggerResponse,
  sandboxWebhookTriggerEndpoint,
} from "../endpoint/sandboxWebhookTriggerEndpoint.js"
export function sandboxWebhookTrigger(
  client: PorkbunClient,
  input: SandboxWebhookTriggerInput,
  options?: PorkbunRequestOptions,
): PromiseResult<SandboxWebhookTriggerResponse> {
  return porkbunEndpointCall(client, sandboxWebhookTriggerEndpoint, input, options)
}
