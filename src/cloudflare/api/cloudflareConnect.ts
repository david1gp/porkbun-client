import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareConnectInput,
  type CloudflareConnectResponse,
  cloudflareConnectEndpoint,
} from "../endpoint/cloudflareConnectEndpoint.js"
export function cloudflareConnect(
  client: PorkbunClient,
  input: CloudflareConnectInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareConnectResponse> {
  return porkbunEndpointCall(client, cloudflareConnectEndpoint, input, options)
}
