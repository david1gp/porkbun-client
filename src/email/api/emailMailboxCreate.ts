import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailMailboxCreateInput,
  type EmailMailboxCreateResponse,
  emailMailboxCreateEndpoint,
} from "../endpoint/emailMailboxCreateEndpoint.js"
export function emailMailboxCreate(
  client: PorkbunClient,
  input: EmailMailboxCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailMailboxCreateResponse> {
  return porkbunEndpointCall(client, emailMailboxCreateEndpoint, input, options)
}
