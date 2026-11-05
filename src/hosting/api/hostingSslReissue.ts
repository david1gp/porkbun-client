import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingSslReissueInput,
  type HostingSslReissueResponse,
  hostingSslReissueEndpoint,
} from "../endpoint/hostingSslReissueEndpoint.js"
export function hostingSslReissue(
  client: PorkbunClient,
  input: HostingSslReissueInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingSslReissueResponse> {
  return porkbunEndpointCall(client, hostingSslReissueEndpoint, input, options)
}
