import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingBackupListInput,
  type HostingBackupListResponse,
  hostingBackupListEndpoint,
} from "../endpoint/hostingBackupListEndpoint.js"
export function hostingBackupList(
  client: PorkbunClient,
  input: HostingBackupListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingBackupListResponse> {
  return porkbunEndpointCall(client, hostingBackupListEndpoint, input, options)
}
