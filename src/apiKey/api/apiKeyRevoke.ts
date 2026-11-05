import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type ApiKeyRevokeInput,
  type ApiKeyRevokeResponse,
  apiKeyRevokeEndpoint,
} from "../endpoint/apiKeyRevokeEndpoint.js"
export function apiKeyRevoke(
  client: PorkbunClient,
  input: ApiKeyRevokeInput,
  options?: PorkbunRequestOptions,
): PromiseResult<ApiKeyRevokeResponse> {
  return porkbunEndpointCall(client, apiKeyRevokeEndpoint, input, options)
}
