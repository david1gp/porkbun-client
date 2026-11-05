import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingWpCredentialCreateInput,
  type HostingWpCredentialCreateResponse,
  hostingWpCredentialCreateEndpoint,
} from "../endpoint/hostingWpCredentialCreateEndpoint.js"
export function hostingWpCredentialCreate(
  client: PorkbunClient,
  input: HostingWpCredentialCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingWpCredentialCreateResponse> {
  return porkbunEndpointCall(client, hostingWpCredentialCreateEndpoint, input, options)
}
