import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingWpCredentialDeleteInput,
  type HostingWpCredentialDeleteResponse,
  hostingWpCredentialDeleteEndpoint,
} from "../endpoint/hostingWpCredentialDeleteEndpoint.js"
export function hostingWpCredentialDelete(
  client: PorkbunClient,
  input: HostingWpCredentialDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingWpCredentialDeleteResponse> {
  return porkbunEndpointCall(client, hostingWpCredentialDeleteEndpoint, input, options)
}
