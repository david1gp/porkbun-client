import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingWpCredentialListInput,
  type HostingWpCredentialListResponse,
  hostingWpCredentialListEndpoint,
} from "../endpoint/hostingWpCredentialListEndpoint.js"
export function hostingWpCredentialList(
  client: PorkbunClient,
  input: HostingWpCredentialListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingWpCredentialListResponse> {
  return porkbunEndpointCall(client, hostingWpCredentialListEndpoint, input, options)
}
