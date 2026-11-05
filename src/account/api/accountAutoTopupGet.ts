import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountAutoTopupGetResponse,
  accountAutoTopupGetEndpoint,
} from "../endpoint/accountAutoTopupGetEndpoint.js"
export function accountAutoTopupGet(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountAutoTopupGetResponse> {
  return porkbunEndpointCall(client, accountAutoTopupGetEndpoint, {}, options)
}
