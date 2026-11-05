import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareProxySetInput,
  type CloudflareProxySetResponse,
  cloudflareProxySetEndpoint,
} from "../endpoint/cloudflareProxySetEndpoint.js"
export function cloudflareProxySet(
  client: PorkbunClient,
  input: CloudflareProxySetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareProxySetResponse> {
  return porkbunEndpointCall(client, cloudflareProxySetEndpoint, input, options)
}
