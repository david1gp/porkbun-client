import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type UrlForwardListInput,
  type UrlForwardListResponse,
  urlForwardListEndpoint,
} from "../endpoint/urlForwardListEndpoint.js"
export function urlForwardList(
  client: PorkbunClient,
  input: UrlForwardListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<UrlForwardListResponse> {
  return porkbunEndpointCall(client, urlForwardListEndpoint, input, options)
}
