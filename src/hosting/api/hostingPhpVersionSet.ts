import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingPhpVersionSetInput,
  type HostingPhpVersionSetResponse,
  hostingPhpVersionSetEndpoint,
} from "../endpoint/hostingPhpVersionSetEndpoint.js"
export function hostingPhpVersionSet(
  client: PorkbunClient,
  input: HostingPhpVersionSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingPhpVersionSetResponse> {
  return porkbunEndpointCall(client, hostingPhpVersionSetEndpoint, input, options)
}
