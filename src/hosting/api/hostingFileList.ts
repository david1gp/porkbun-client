import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingFileListInput,
  type HostingFileListResponse,
  hostingFileListEndpoint,
} from "../endpoint/hostingFileListEndpoint.js"
export function hostingFileList(
  client: PorkbunClient,
  input: HostingFileListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingFileListResponse> {
  return porkbunEndpointCall(client, hostingFileListEndpoint, input, options)
}
