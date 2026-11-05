import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AftermarketSearchInput,
  type AftermarketSearchResponse,
  aftermarketSearchEndpoint,
} from "../endpoint/aftermarketSearchEndpoint.js"
export function aftermarketSearch(
  client: PorkbunClient,
  input: AftermarketSearchInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AftermarketSearchResponse> {
  return porkbunEndpointCall(client, aftermarketSearchEndpoint, input, options)
}
