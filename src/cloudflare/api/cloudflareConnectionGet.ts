import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareConnectionGetResponse,
  cloudflareConnectionGetEndpoint,
} from "../endpoint/cloudflareConnectionGetEndpoint.js"
export function cloudflareConnectionGet(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareConnectionGetResponse> {
  return porkbunEndpointCall(client, cloudflareConnectionGetEndpoint, {}, options)
}
