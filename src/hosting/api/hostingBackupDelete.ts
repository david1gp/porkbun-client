import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingBackupDeleteInput,
  type HostingBackupDeleteResponse,
  hostingBackupDeleteEndpoint,
} from "../endpoint/hostingBackupDeleteEndpoint.js"
export function hostingBackupDelete(
  client: PorkbunClient,
  input: HostingBackupDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingBackupDeleteResponse> {
  return porkbunEndpointCall(client, hostingBackupDeleteEndpoint, input, options)
}
