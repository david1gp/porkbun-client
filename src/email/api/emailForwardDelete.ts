import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailForwardDeleteInput,
  type EmailForwardDeleteResponse,
  emailForwardDeleteEndpoint,
} from "../endpoint/emailForwardDeleteEndpoint.js"
export function emailForwardDelete(
  client: PorkbunClient,
  input: EmailForwardDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailForwardDeleteResponse> {
  return porkbunEndpointCall(client, emailForwardDeleteEndpoint, input, options)
}
