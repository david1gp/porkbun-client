import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type TransferGetInput,
  type TransferGetResponse,
  transferGetEndpoint,
} from "../endpoint/transferGetEndpoint.js"
export function transferGet(
  client: PorkbunClient,
  input: TransferGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<TransferGetResponse> {
  return porkbunEndpointCall(client, transferGetEndpoint, input, options)
}
