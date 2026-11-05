import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type PricingGetInput, type PricingGetResponse, pricingGetEndpoint } from "../endpoint/pricingGetEndpoint.js"

export function pricingGet(
  client: PorkbunClient,
  input: PricingGetInput = {},
  options?: PorkbunRequestOptions,
): PromiseResult<PricingGetResponse> {
  return porkbunEndpointCall(client, pricingGetEndpoint, input, options)
}
