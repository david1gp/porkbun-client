import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountPhoneVerificationSendInput,
  type AccountPhoneVerificationSendResponse,
  accountPhoneVerificationSendEndpoint,
} from "../endpoint/accountPhoneVerificationSendEndpoint.js"
export function accountPhoneVerificationSend(
  client: PorkbunClient,
  input: AccountPhoneVerificationSendInput,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountPhoneVerificationSendResponse> {
  return porkbunEndpointCall(client, accountPhoneVerificationSendEndpoint, input, options)
}
