import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareQueueListResponse,
  cloudflareQueueListEndpoint,
} from "../endpoint/cloudflareQueueListEndpoint.js"
export function cloudflareQueueList(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareQueueListResponse> {
  return porkbunEndpointCall(client, cloudflareQueueListEndpoint, {}, options)
}
