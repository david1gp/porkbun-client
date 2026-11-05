import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountInviteStatusGetInput,
  type AccountInviteStatusGetResponse,
  accountInviteStatusGetEndpoint,
} from "../endpoint/accountInviteStatusGetEndpoint.js"
export function accountInviteStatusGet(
  client: PorkbunClient,
  input: AccountInviteStatusGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountInviteStatusGetResponse> {
  return porkbunEndpointCall(client, accountInviteStatusGetEndpoint, input, options)
}
