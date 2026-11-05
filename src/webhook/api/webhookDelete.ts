import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookDeleteInput,
  type WebhookDeleteResponse,
  webhookDeleteEndpoint,
} from "../endpoint/webhookDeleteEndpoint.js"
export function webhookDelete(
  client: PorkbunClient,
  input: WebhookDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookDeleteResponse> {
  return porkbunEndpointCall(client, webhookDeleteEndpoint, input, options)
}
