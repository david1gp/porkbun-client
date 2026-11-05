import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingDirCreateInput,
  type HostingDirCreateResponse,
  hostingDirCreateEndpoint,
} from "../endpoint/hostingDirCreateEndpoint.js"
export function hostingDirCreate(
  client: PorkbunClient,
  input: HostingDirCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingDirCreateResponse> {
  return porkbunEndpointCall(client, hostingDirCreateEndpoint, input, options)
}
