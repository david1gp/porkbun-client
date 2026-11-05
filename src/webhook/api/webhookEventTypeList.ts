import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookEventTypeListResponse,
  webhookEventTypeListEndpoint,
} from "../endpoint/webhookEventTypeListEndpoint.js"
export function webhookEventTypeList(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookEventTypeListResponse> {
  return porkbunEndpointCall(client, webhookEventTypeListEndpoint, {}, options)
}
