import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type HostingGetInput, type HostingGetResponse, hostingGetEndpoint } from "../endpoint/hostingGetEndpoint.js"
export function hostingGet(
  client: PorkbunClient,
  input: HostingGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingGetResponse> {
  return porkbunEndpointCall(client, hostingGetEndpoint, input, options)
}
