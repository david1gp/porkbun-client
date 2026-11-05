import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountInviteCreateInput,
  type AccountInviteCreateResponse,
  accountInviteCreateEndpoint,
} from "../endpoint/accountInviteCreateEndpoint.js"
export function accountInviteCreate(
  client: PorkbunClient,
  input: AccountInviteCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountInviteCreateResponse> {
  return porkbunEndpointCall(client, accountInviteCreateEndpoint, input, options)
}
