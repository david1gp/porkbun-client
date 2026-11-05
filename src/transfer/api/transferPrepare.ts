import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type TransferPrepareInput,
  type TransferPrepareResponse,
  transferPrepareEndpoint,
} from "../endpoint/transferPrepareEndpoint.js"
export function transferPrepare(
  client: PorkbunClient,
  input: TransferPrepareInput,
  options?: PorkbunRequestOptions,
): PromiseResult<TransferPrepareResponse> {
  return porkbunEndpointCall(client, transferPrepareEndpoint, input, options)
}
