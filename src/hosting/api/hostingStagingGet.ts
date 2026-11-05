import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingGetInput,
  type HostingStagingGetResponse,
  hostingStagingGetEndpoint,
} from "../endpoint/hostingStagingGetEndpoint.js"
export function hostingStagingGet(
  client: PorkbunClient,
  input: HostingStagingGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingGetResponse> {
  return porkbunEndpointCall(client, hostingStagingGetEndpoint, input, options)
}
