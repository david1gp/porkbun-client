import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailForwardCreateInput,
  type EmailForwardCreateResponse,
  emailForwardCreateEndpoint,
} from "../endpoint/emailForwardCreateEndpoint.js"
export function emailForwardCreate(
  client: PorkbunClient,
  input: EmailForwardCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailForwardCreateResponse> {
  return porkbunEndpointCall(client, emailForwardCreateEndpoint, input, options)
}
