import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingAutoRenewUpdateInput,
  type HostingAutoRenewUpdateResponse,
  hostingAutoRenewUpdateEndpoint,
} from "../endpoint/hostingAutoRenewUpdateEndpoint.js"
export function hostingAutoRenewUpdate(
  client: PorkbunClient,
  input: HostingAutoRenewUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingAutoRenewUpdateResponse> {
  return porkbunEndpointCall(client, hostingAutoRenewUpdateEndpoint, input, options)
}
