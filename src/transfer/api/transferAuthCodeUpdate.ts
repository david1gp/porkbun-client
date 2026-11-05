import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type TransferAuthCodeUpdateInput,
  type TransferAuthCodeUpdateResponse,
  transferAuthCodeUpdateEndpoint,
} from "../endpoint/transferAuthCodeUpdateEndpoint.js"
export function transferAuthCodeUpdate(
  client: PorkbunClient,
  input: TransferAuthCodeUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<TransferAuthCodeUpdateResponse> {
  return porkbunEndpointCall(client, transferAuthCodeUpdateEndpoint, input, options)
}
