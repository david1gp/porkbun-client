import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareMoveRetryInput,
  type CloudflareMoveRetryResponse,
  cloudflareMoveRetryEndpoint,
} from "../endpoint/cloudflareMoveRetryEndpoint.js"
export function cloudflareMoveRetry(
  client: PorkbunClient,
  input: CloudflareMoveRetryInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareMoveRetryResponse> {
  return porkbunEndpointCall(client, cloudflareMoveRetryEndpoint, input, options)
}
