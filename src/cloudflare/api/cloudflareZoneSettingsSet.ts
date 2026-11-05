import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareZoneSettingsSetInput,
  type CloudflareZoneSettingsSetResponse,
  cloudflareZoneSettingsSetEndpoint,
} from "../endpoint/cloudflareZoneSettingsSetEndpoint.js"
export function cloudflareZoneSettingsSet(
  client: PorkbunClient,
  input: CloudflareZoneSettingsSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareZoneSettingsSetResponse> {
  return porkbunEndpointCall(client, cloudflareZoneSettingsSetEndpoint, input, options)
}
