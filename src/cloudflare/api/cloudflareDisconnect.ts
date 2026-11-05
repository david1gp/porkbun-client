import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareDisconnectInput,
  type CloudflareDisconnectResponse,
  cloudflareDisconnectEndpoint,
} from "../endpoint/cloudflareDisconnectEndpoint.js"
export function cloudflareDisconnect(
  client: PorkbunClient,
  input: CloudflareDisconnectInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareDisconnectResponse> {
  return porkbunEndpointCall(client, cloudflareDisconnectEndpoint, input, options)
}
