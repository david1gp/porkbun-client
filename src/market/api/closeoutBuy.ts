import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloseoutBuyInput,
  type CloseoutBuyResponse,
  closeoutBuyEndpoint,
} from "../endpoint/closeoutBuyEndpoint.js"
export function closeoutBuy(
  client: PorkbunClient,
  input: CloseoutBuyInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloseoutBuyResponse> {
  return porkbunEndpointCall(client, closeoutBuyEndpoint, input, options)
}
