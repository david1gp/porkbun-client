import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareRecordDeleteInput,
  type CloudflareRecordDeleteResponse,
  cloudflareRecordDeleteEndpoint,
} from "../endpoint/cloudflareRecordDeleteEndpoint.js"
export function cloudflareRecordDelete(
  client: PorkbunClient,
  input: CloudflareRecordDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareRecordDeleteResponse> {
  return porkbunEndpointCall(client, cloudflareRecordDeleteEndpoint, input, options)
}
