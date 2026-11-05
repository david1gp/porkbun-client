import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloseoutSearchInput,
  type CloseoutSearchResponse,
  closeoutSearchEndpoint,
} from "../endpoint/closeoutSearchEndpoint.js"
export function closeoutSearch(
  client: PorkbunClient,
  input: CloseoutSearchInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloseoutSearchResponse> {
  return porkbunEndpointCall(client, closeoutSearchEndpoint, input, options)
}
