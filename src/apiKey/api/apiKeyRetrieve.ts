import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type ApiKeyRetrieveInput,
  type ApiKeyRetrieveResponse,
  apiKeyRetrieveEndpoint,
} from "../endpoint/apiKeyRetrieveEndpoint.js"
export function apiKeyRetrieve(
  client: PorkbunClient,
  input: ApiKeyRetrieveInput,
  options?: PorkbunRequestOptions,
): PromiseResult<ApiKeyRetrieveResponse> {
  return porkbunEndpointCall(client, apiKeyRetrieveEndpoint, input, options)
}
