import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type ApiKeyRequestInput,
  type ApiKeyRequestResponse,
  apiKeyRequestEndpoint,
} from "../endpoint/apiKeyRequestEndpoint.js"
export function apiKeyRequest(
  client: PorkbunClient,
  input: ApiKeyRequestInput,
  options?: PorkbunRequestOptions,
): PromiseResult<ApiKeyRequestResponse> {
  return porkbunEndpointCall(client, apiKeyRequestEndpoint, input, options)
}
