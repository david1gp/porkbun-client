import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareRecordCreateInput,
  type CloudflareRecordCreateResponse,
  cloudflareRecordCreateEndpoint,
} from "../endpoint/cloudflareRecordCreateEndpoint.js"
export function cloudflareRecordCreate(
  client: PorkbunClient,
  input: CloudflareRecordCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareRecordCreateResponse> {
  return porkbunEndpointCall(client, cloudflareRecordCreateEndpoint, input, options)
}
