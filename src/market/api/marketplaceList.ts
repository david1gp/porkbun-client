import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type MarketplaceListInput,
  type MarketplaceListResponse,
  marketplaceListEndpoint,
} from "../endpoint/marketplaceListEndpoint.js"
export function marketplaceList(
  client: PorkbunClient,
  input: MarketplaceListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<MarketplaceListResponse> {
  return porkbunEndpointCall(client, marketplaceListEndpoint, input, options)
}
