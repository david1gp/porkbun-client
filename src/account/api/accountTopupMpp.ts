import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountTopupMppInput,
  type AccountTopupMppResponse,
  accountTopupMppEndpoint,
} from "../endpoint/accountTopupMppEndpoint.js"
export function accountTopupMpp(
  client: PorkbunClient,
  input: AccountTopupMppInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountTopupMppResponse> {
  return porkbunEndpointCall(client, accountTopupMppEndpoint, input, options)
}
