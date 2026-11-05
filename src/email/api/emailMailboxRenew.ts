import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailMailboxRenewInput,
  type EmailMailboxRenewResponse,
  emailMailboxRenewEndpoint,
} from "../endpoint/emailMailboxRenewEndpoint.js"
export function emailMailboxRenew(
  client: PorkbunClient,
  input: EmailMailboxRenewInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailMailboxRenewResponse> {
  return porkbunEndpointCall(client, emailMailboxRenewEndpoint, input, options)
}
