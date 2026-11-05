import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingDeleteInput,
  type HostingStagingDeleteResponse,
  hostingStagingDeleteEndpoint,
} from "../endpoint/hostingStagingDeleteEndpoint.js"
export function hostingStagingDelete(
  client: PorkbunClient,
  input: HostingStagingDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingDeleteResponse> {
  return porkbunEndpointCall(client, hostingStagingDeleteEndpoint, input, options)
}
