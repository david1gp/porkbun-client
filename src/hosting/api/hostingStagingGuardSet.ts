import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingGuardSetInput,
  type HostingStagingGuardSetResponse,
  hostingStagingGuardSetEndpoint,
} from "../endpoint/hostingStagingGuardSetEndpoint.js"
export function hostingStagingGuardSet(
  client: PorkbunClient,
  input: HostingStagingGuardSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingGuardSetResponse> {
  return porkbunEndpointCall(client, hostingStagingGuardSetEndpoint, input, options)
}
