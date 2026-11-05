import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountEmailVerificationSendResponse,
  accountEmailVerificationSendEndpoint,
} from "../endpoint/accountEmailVerificationSendEndpoint.js"
export function accountEmailVerificationSend(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountEmailVerificationSendResponse> {
  return porkbunEndpointCall(client, accountEmailVerificationSendEndpoint, {}, options)
}
