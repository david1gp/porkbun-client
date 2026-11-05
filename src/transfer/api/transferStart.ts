import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type TransferStartInput,
  type TransferStartResponse,
  transferStartEndpoint,
} from "../endpoint/transferStartEndpoint.js"
export function transferStart(
  client: PorkbunClient,
  input: TransferStartInput,
  options?: PorkbunRequestOptions,
): PromiseResult<TransferStartResponse> {
  return porkbunEndpointCall(client, transferStartEndpoint, input, options)
}
