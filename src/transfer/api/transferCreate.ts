import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type TransferCreateInput,
  type TransferCreateResponse,
  transferCreateEndpoint,
} from "../endpoint/transferCreateEndpoint.js"
export function transferCreate(
  client: PorkbunClient,
  input: TransferCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<TransferCreateResponse> {
  return porkbunEndpointCall(client, transferCreateEndpoint, input, options)
}
