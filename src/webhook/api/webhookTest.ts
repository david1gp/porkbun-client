import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookTestInput,
  type WebhookTestResponse,
  webhookTestEndpoint,
} from "../endpoint/webhookTestEndpoint.js"
export function webhookTest(
  client: PorkbunClient,
  input: WebhookTestInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookTestResponse> {
  return porkbunEndpointCall(client, webhookTestEndpoint, input, options)
}
