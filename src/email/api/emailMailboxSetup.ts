import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailMailboxSetupInput,
  type EmailMailboxSetupResponse,
  emailMailboxSetupEndpoint,
} from "../endpoint/emailMailboxSetupEndpoint.js"
export function emailMailboxSetup(
  client: PorkbunClient,
  input: EmailMailboxSetupInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailMailboxSetupResponse> {
  return porkbunEndpointCall(client, emailMailboxSetupEndpoint, input, options)
}
