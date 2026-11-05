import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type SslBundleGetInput,
  type SslBundleGetResponse,
  sslBundleGetEndpoint,
} from "../endpoint/sslBundleGetEndpoint.js"
export function sslBundleGet(
  client: PorkbunClient,
  input: SslBundleGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<SslBundleGetResponse> {
  return porkbunEndpointCall(client, sslBundleGetEndpoint, input, options)
}
