import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailMailboxListInput,
  type EmailMailboxListResponse,
  emailMailboxListEndpoint,
} from "../endpoint/emailMailboxListEndpoint.js"
export function emailMailboxList(
  client: PorkbunClient,
  input: EmailMailboxListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailMailboxListResponse> {
  return porkbunEndpointCall(client, emailMailboxListEndpoint, input, options)
}
