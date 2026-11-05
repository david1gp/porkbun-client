import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountTopupCryptoStatusGetInput,
  type AccountTopupCryptoStatusGetResponse,
  accountTopupCryptoStatusGetEndpoint,
} from "../endpoint/accountTopupCryptoStatusGetEndpoint.js"
export function accountTopupCryptoStatusGet(
  client: PorkbunClient,
  input: AccountTopupCryptoStatusGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountTopupCryptoStatusGetResponse> {
  return porkbunEndpointCall(client, accountTopupCryptoStatusGetEndpoint, input, options)
}
