import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type WebhookSecretRotateInput,
  type WebhookSecretRotateResponse,
  webhookSecretRotateEndpoint,
} from "../endpoint/webhookSecretRotateEndpoint.js"
export function webhookSecretRotate(
  client: PorkbunClient,
  input: WebhookSecretRotateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<WebhookSecretRotateResponse> {
  return porkbunEndpointCall(client, webhookSecretRotateEndpoint, input, options)
}
