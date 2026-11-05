import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingEnvironmentSetInput,
  type HostingStagingEnvironmentSetResponse,
  hostingStagingEnvironmentSetEndpoint,
} from "../endpoint/hostingStagingEnvironmentSetEndpoint.js"
export function hostingStagingEnvironmentSet(
  client: PorkbunClient,
  input: HostingStagingEnvironmentSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingEnvironmentSetResponse> {
  return porkbunEndpointCall(client, hostingStagingEnvironmentSetEndpoint, input, options)
}
