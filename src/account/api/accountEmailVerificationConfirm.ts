import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountEmailVerificationConfirmInput,
  type AccountEmailVerificationConfirmResponse,
  accountEmailVerificationConfirmEndpoint,
} from "../endpoint/accountEmailVerificationConfirmEndpoint.js"
export function accountEmailVerificationConfirm(
  client: PorkbunClient,
  input: AccountEmailVerificationConfirmInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountEmailVerificationConfirmResponse> {
  return porkbunEndpointCall(client, accountEmailVerificationConfirmEndpoint, input, options)
}
