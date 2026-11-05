import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type WebhookGetInput, type WebhookGetResponse, webhookGetEndpoint } from "../endpoint/webhookGetEndpoint.js"
export function webhookGet(
  client: PorkbunClient,
  input: WebhookGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookGetResponse> {
  return porkbunEndpointCall(client, webhookGetEndpoint, input, options)
}
