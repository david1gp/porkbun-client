import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountInvoiceGetInput,
  type AccountInvoiceGetResponse,
  accountInvoiceGetEndpoint,
} from "../endpoint/accountInvoiceGetEndpoint.js"
export function accountInvoiceGet(
  client: PorkbunClient,
  input: AccountInvoiceGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountInvoiceGetResponse> {
  return porkbunEndpointCall(client, accountInvoiceGetEndpoint, input, options)
}
