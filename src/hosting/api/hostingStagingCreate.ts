import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingCreateInput,
  type HostingStagingCreateResponse,
  hostingStagingCreateEndpoint,
} from "../endpoint/hostingStagingCreateEndpoint.js"
export function hostingStagingCreate(
  client: PorkbunClient,
  input: HostingStagingCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingCreateResponse> {
  return porkbunEndpointCall(client, hostingStagingCreateEndpoint, input, options)
}
