import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareZoneSettingsGetInput,
  type CloudflareZoneSettingsGetResponse,
  cloudflareZoneSettingsGetEndpoint,
} from "../endpoint/cloudflareZoneSettingsGetEndpoint.js"
export function cloudflareZoneSettingsGet(
  client: PorkbunClient,
  input: CloudflareZoneSettingsGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareZoneSettingsGetResponse> {
  return porkbunEndpointCall(client, cloudflareZoneSettingsGetEndpoint, input, options)
}
