import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountInvoicePdfGetInput,
  type AccountInvoicePdfGetResponse,
  accountInvoicePdfGetEndpoint,
} from "../endpoint/accountInvoicePdfGetEndpoint.js"
export function accountInvoicePdfGet(
  client: PorkbunClient,
  input: AccountInvoicePdfGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountInvoicePdfGetResponse> {
  return porkbunEndpointCall(client, accountInvoicePdfGetEndpoint, input, options)
}
