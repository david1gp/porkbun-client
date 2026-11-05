import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type EmailForwardListInput,
  type EmailForwardListResponse,
  emailForwardListEndpoint,
} from "../endpoint/emailForwardListEndpoint.js"
export function emailForwardList(
  client: PorkbunClient,
  input: EmailForwardListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<EmailForwardListResponse> {
  return porkbunEndpointCall(client, emailForwardListEndpoint, input, options)
}
