import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountInvoiceListInput,
  type AccountInvoiceListResponse,
  accountInvoiceListEndpoint,
} from "../endpoint/accountInvoiceListEndpoint.js"
export function accountInvoiceList(
  client: PorkbunClient,
  input: AccountInvoiceListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountInvoiceListResponse> {
  return porkbunEndpointCall(client, accountInvoiceListEndpoint, input, options)
}
