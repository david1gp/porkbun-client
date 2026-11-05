import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingCreateInput,
  type HostingCreateResponse,
  hostingCreateEndpoint,
} from "../endpoint/hostingCreateEndpoint.js"
export function hostingCreate(
  client: PorkbunClient,
  input: HostingCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingCreateResponse> {
  return porkbunEndpointCall(client, hostingCreateEndpoint, input, options)
}
