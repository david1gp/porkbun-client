import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type DnsScanInput, type DnsScanResponse, dnsScanEndpoint } from "../endpoint/dnsScanEndpoint.js"
export function dnsScan(
  client: PorkbunClient,
  input: DnsScanInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsScanResponse> {
  return porkbunEndpointCall(client, dnsScanEndpoint, input, options)
}
