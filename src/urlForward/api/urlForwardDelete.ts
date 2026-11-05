import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type UrlForwardDeleteInput,
  type UrlForwardDeleteResponse,
  urlForwardDeleteEndpoint,
} from "../endpoint/urlForwardDeleteEndpoint.js"
export function urlForwardDelete(
  client: PorkbunClient,
  input: UrlForwardDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<UrlForwardDeleteResponse> {
  return porkbunEndpointCall(client, urlForwardDeleteEndpoint, input, options)
}
