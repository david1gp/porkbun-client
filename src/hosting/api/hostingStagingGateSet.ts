import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingGateSetInput,
  type HostingStagingGateSetResponse,
  hostingStagingGateSetEndpoint,
} from "../endpoint/hostingStagingGateSetEndpoint.js"
export function hostingStagingGateSet(
  client: PorkbunClient,
  input: HostingStagingGateSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingGateSetResponse> {
  return porkbunEndpointCall(client, hostingStagingGateSetEndpoint, input, options)
}
