import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookUpdateInput,
  type WebhookUpdateResponse,
  webhookUpdateEndpoint,
} from "../endpoint/webhookUpdateEndpoint.js"
export function webhookUpdate(
  client: PorkbunClient,
  input: WebhookUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookUpdateResponse> {
  return porkbunEndpointCall(client, webhookUpdateEndpoint, input, options)
}
