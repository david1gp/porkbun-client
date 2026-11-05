import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type UtilityIpResponse, utilityIpEndpoint } from "../endpoint/utilityIpEndpoint.js"

export function utilityIp(client: PorkbunClient, options?: PorkbunRequestOptions): PromiseResult<UtilityIpResponse> {
  return porkbunEndpointCall(client, utilityIpEndpoint, {}, options)
}
