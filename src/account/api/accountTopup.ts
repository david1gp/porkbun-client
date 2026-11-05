import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountTopupInput,
  type AccountTopupResponse,
  accountTopupEndpoint,
} from "../endpoint/accountTopupEndpoint.js"
export function accountTopup(
  client: PorkbunClient,
  input: AccountTopupInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountTopupResponse> {
  return porkbunEndpointCall(client, accountTopupEndpoint, input, options)
}
