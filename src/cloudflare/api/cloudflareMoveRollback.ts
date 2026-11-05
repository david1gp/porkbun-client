import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareMoveRollbackInput,
  type CloudflareMoveRollbackResponse,
  cloudflareMoveRollbackEndpoint,
} from "../endpoint/cloudflareMoveRollbackEndpoint.js"
export function cloudflareMoveRollback(
  client: PorkbunClient,
  input: CloudflareMoveRollbackInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareMoveRollbackResponse> {
  return porkbunEndpointCall(client, cloudflareMoveRollbackEndpoint, input, options)
}
