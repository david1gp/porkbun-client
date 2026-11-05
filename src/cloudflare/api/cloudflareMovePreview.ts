import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type CloudflareMovePreviewInput,
  type CloudflareMovePreviewResponse,
  cloudflareMovePreviewEndpoint,
} from "../endpoint/cloudflareMovePreviewEndpoint.js"
export function cloudflareMovePreview(
  client: PorkbunClient,
  input: CloudflareMovePreviewInput,
  options?: PorkbunRequestOptions,
): PromiseResult<CloudflareMovePreviewResponse> {
  return porkbunEndpointCall(client, cloudflareMovePreviewEndpoint, input, options)
}
