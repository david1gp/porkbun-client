import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingBackupCreateInput,
  type HostingBackupCreateResponse,
  hostingBackupCreateEndpoint,
} from "../endpoint/hostingBackupCreateEndpoint.js"
export function hostingBackupCreate(
  client: PorkbunClient,
  input: HostingBackupCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingBackupCreateResponse> {
  return porkbunEndpointCall(client, hostingBackupCreateEndpoint, input, options)
}
