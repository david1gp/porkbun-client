import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareInventoryListResponse,
  cloudflareInventoryListEndpoint,
} from "../endpoint/cloudflareInventoryListEndpoint.js"
export function cloudflareInventoryList(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareInventoryListResponse> {
  return porkbunEndpointCall(client, cloudflareInventoryListEndpoint, {}, options)
}
