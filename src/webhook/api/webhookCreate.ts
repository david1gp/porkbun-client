import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookCreateInput,
  type WebhookCreateResponse,
  webhookCreateEndpoint,
} from "../endpoint/webhookCreateEndpoint.js"
export function webhookCreate(
  client: PorkbunClient,
  input: WebhookCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookCreateResponse> {
  return porkbunEndpointCall(client, webhookCreateEndpoint, input, options)
}
