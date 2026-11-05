import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountAutoTopupSetInput,
  type AccountAutoTopupSetResponse,
  accountAutoTopupSetEndpoint,
} from "../endpoint/accountAutoTopupSetEndpoint.js"
export function accountAutoTopupSet(
  client: PorkbunClient,
  input: AccountAutoTopupSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountAutoTopupSetResponse> {
  return porkbunEndpointCall(client, accountAutoTopupSetEndpoint, input, options)
}
