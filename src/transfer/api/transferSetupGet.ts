import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type TransferSetupGetInput,
  type TransferSetupGetResponse,
  transferSetupGetEndpoint,
} from "../endpoint/transferSetupGetEndpoint.js"
export function transferSetupGet(
  client: PorkbunClient,
  input: TransferSetupGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<TransferSetupGetResponse> {
  return porkbunEndpointCall(client, transferSetupGetEndpoint, input, options)
}
