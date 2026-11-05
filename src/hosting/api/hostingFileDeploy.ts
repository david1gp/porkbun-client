import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingFileDeployInput,
  type HostingFileDeployResponse,
  hostingFileDeployEndpoint,
} from "../endpoint/hostingFileDeployEndpoint.js"
export function hostingFileDeploy(
  client: PorkbunClient,
  input: HostingFileDeployInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingFileDeployResponse> {
  return porkbunEndpointCall(client, hostingFileDeployEndpoint, input, options)
}
