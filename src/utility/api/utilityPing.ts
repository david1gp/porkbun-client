import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type UtilityPingResponse, utilityPingEndpoint } from "../endpoint/utilityPingEndpoint.js"

export function utilityPing(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<UtilityPingResponse> {
  return porkbunEndpointCall(client, utilityPingEndpoint, {}, options)
}
