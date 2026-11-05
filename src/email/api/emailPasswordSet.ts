import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailPasswordSetInput,
  type EmailPasswordSetResponse,
  emailPasswordSetEndpoint,
} from "../endpoint/emailPasswordSetEndpoint.js"
export function emailPasswordSet(
  client: PorkbunClient,
  input: EmailPasswordSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailPasswordSetResponse> {
  return porkbunEndpointCall(client, emailPasswordSetEndpoint, input, options)
}
