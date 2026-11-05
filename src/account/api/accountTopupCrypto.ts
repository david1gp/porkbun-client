import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountTopupCryptoInput,
  type AccountTopupCryptoResponse,
  accountTopupCryptoEndpoint,
} from "../endpoint/accountTopupCryptoEndpoint.js"
export function accountTopupCrypto(
  client: PorkbunClient,
  input: AccountTopupCryptoInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountTopupCryptoResponse> {
  return porkbunEndpointCall(client, accountTopupCryptoEndpoint, input, options)
}
