import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareZoneGetInput,
  type CloudflareZoneGetResponse,
  cloudflareZoneGetEndpoint,
} from "../endpoint/cloudflareZoneGetEndpoint.js"
export function cloudflareZoneGet(
  client: PorkbunClient,
  input: CloudflareZoneGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareZoneGetResponse> {
  return porkbunEndpointCall(client, cloudflareZoneGetEndpoint, input, options)
}
