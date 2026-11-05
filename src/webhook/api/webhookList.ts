import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type WebhookListResponse, webhookListEndpoint } from "../endpoint/webhookListEndpoint.js"
export function webhookList(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookListResponse> {
  return porkbunEndpointCall(client, webhookListEndpoint, {}, options)
}
