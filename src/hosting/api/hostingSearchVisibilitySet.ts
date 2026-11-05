import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingSearchVisibilitySetInput,
  type HostingSearchVisibilitySetResponse,
  hostingSearchVisibilitySetEndpoint,
} from "../endpoint/hostingSearchVisibilitySetEndpoint.js"
export function hostingSearchVisibilitySet(
  client: PorkbunClient,
  input: HostingSearchVisibilitySetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingSearchVisibilitySetResponse> {
  return porkbunEndpointCall(client, hostingSearchVisibilitySetEndpoint, input, options)
}
