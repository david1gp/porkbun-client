import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareMoveGetInput,
  type CloudflareMoveGetResponse,
  cloudflareMoveGetEndpoint,
} from "../endpoint/cloudflareMoveGetEndpoint.js"
export function cloudflareMoveGet(
  client: PorkbunClient,
  input: CloudflareMoveGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareMoveGetResponse> {
  return porkbunEndpointCall(client, cloudflareMoveGetEndpoint, input, options)
}
