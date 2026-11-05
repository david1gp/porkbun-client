import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookDeliveryResendInput,
  type WebhookDeliveryResendResponse,
  webhookDeliveryResendEndpoint,
} from "../endpoint/webhookDeliveryResendEndpoint.js"
export function webhookDeliveryResend(
  client: PorkbunClient,
  input: WebhookDeliveryResendInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookDeliveryResendResponse> {
  return porkbunEndpointCall(client, webhookDeliveryResendEndpoint, input, options)
}
