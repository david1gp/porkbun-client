import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingBackupRestoreInput,
  type HostingBackupRestoreResponse,
  hostingBackupRestoreEndpoint,
} from "../endpoint/hostingBackupRestoreEndpoint.js"
export function hostingBackupRestore(
  client: PorkbunClient,
  input: HostingBackupRestoreInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingBackupRestoreResponse> {
  return porkbunEndpointCall(client, hostingBackupRestoreEndpoint, input, options)
}
