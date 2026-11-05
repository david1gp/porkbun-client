import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareRecordListInput,
  type CloudflareRecordListResponse,
  cloudflareRecordListEndpoint,
} from "../endpoint/cloudflareRecordListEndpoint.js"
export function cloudflareRecordList(
  client: PorkbunClient,
  input: CloudflareRecordListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareRecordListResponse> {
  return porkbunEndpointCall(client, cloudflareRecordListEndpoint, input, options)
}
