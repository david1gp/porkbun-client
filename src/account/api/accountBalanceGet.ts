import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type AccountBalanceGetResponse, accountBalanceGetEndpoint } from "../endpoint/accountBalanceGetEndpoint.js"
export function accountBalanceGet(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountBalanceGetResponse> {
  return porkbunEndpointCall(client, accountBalanceGetEndpoint, {}, options)
}
