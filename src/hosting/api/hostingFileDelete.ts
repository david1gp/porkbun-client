import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingFileDeleteInput,
  type HostingFileDeleteResponse,
  hostingFileDeleteEndpoint,
} from "../endpoint/hostingFileDeleteEndpoint.js"
export function hostingFileDelete(
  client: PorkbunClient,
  input: HostingFileDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingFileDeleteResponse> {
  return porkbunEndpointCall(client, hostingFileDeleteEndpoint, input, options)
}
