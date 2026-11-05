import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingDeleteInput,
  type HostingDeleteResponse,
  hostingDeleteEndpoint,
} from "../endpoint/hostingDeleteEndpoint.js"
export function hostingDelete(
  client: PorkbunClient,
  input: HostingDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingDeleteResponse> {
  return porkbunEndpointCall(client, hostingDeleteEndpoint, input, options)
}
