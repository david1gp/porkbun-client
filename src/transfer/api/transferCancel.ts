import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type TransferCancelInput,
  type TransferCancelResponse,
  transferCancelEndpoint,
} from "../endpoint/transferCancelEndpoint.js"
export function transferCancel(
  client: PorkbunClient,
  input: TransferCancelInput,
  options?: PorkbunRequestOptions,
): PromiseResult<TransferCancelResponse> {
  return porkbunEndpointCall(client, transferCancelEndpoint, input, options)
}
