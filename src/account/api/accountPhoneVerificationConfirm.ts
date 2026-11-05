import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountPhoneVerificationConfirmInput,
  type AccountPhoneVerificationConfirmResponse,
  accountPhoneVerificationConfirmEndpoint,
} from "../endpoint/accountPhoneVerificationConfirmEndpoint.js"
export function accountPhoneVerificationConfirm(
  client: PorkbunClient,
  input: AccountPhoneVerificationConfirmInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountPhoneVerificationConfirmResponse> {
  return porkbunEndpointCall(client, accountPhoneVerificationConfirmEndpoint, input, options)
}
