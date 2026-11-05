import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareRecordEditInput,
  type CloudflareRecordEditResponse,
  cloudflareRecordEditEndpoint,
} from "../endpoint/cloudflareRecordEditEndpoint.js"
export function cloudflareRecordEdit(
  client: PorkbunClient,
  input: CloudflareRecordEditInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareRecordEditResponse> {
  return porkbunEndpointCall(client, cloudflareRecordEditEndpoint, input, options)
}
