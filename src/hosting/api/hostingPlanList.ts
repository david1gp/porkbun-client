import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type HostingPlanListResponse, hostingPlanListEndpoint } from "../endpoint/hostingPlanListEndpoint.js"
export function hostingPlanList(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingPlanListResponse> {
  return porkbunEndpointCall(client, hostingPlanListEndpoint, {}, options)
}
