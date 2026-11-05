import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookDeliveryListInput,
  type WebhookDeliveryListResponse,
  webhookDeliveryListEndpoint,
} from "../endpoint/webhookDeliveryListEndpoint.js"
export function webhookDeliveryList(
  client: PorkbunClient,
  input: WebhookDeliveryListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookDeliveryListResponse> {
  return porkbunEndpointCall(client, webhookDeliveryListEndpoint, input, options)
}
