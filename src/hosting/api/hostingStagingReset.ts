import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingResetInput,
  type HostingStagingResetResponse,
  hostingStagingResetEndpoint,
} from "../endpoint/hostingStagingResetEndpoint.js"
export function hostingStagingReset(
  client: PorkbunClient,
  input: HostingStagingResetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingResetResponse> {
  return porkbunEndpointCall(client, hostingStagingResetEndpoint, input, options)
}
