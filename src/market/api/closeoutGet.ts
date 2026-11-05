import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloseoutGetInput,
  type CloseoutGetResponse,
  closeoutGetEndpoint,
} from "../endpoint/closeoutGetEndpoint.js"
export function closeoutGet(
  client: PorkbunClient,
  input: CloseoutGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloseoutGetResponse> {
  return porkbunEndpointCall(client, closeoutGetEndpoint, input, options)
}
