import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookDeliveryGetInput,
  type WebhookDeliveryGetResponse,
  webhookDeliveryGetEndpoint,
} from "../endpoint/webhookDeliveryGetEndpoint.js"
export function webhookDeliveryGet(
  client: PorkbunClient,
  input: WebhookDeliveryGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookDeliveryGetResponse> {
  return porkbunEndpointCall(client, webhookDeliveryGetEndpoint, input, options)
}
