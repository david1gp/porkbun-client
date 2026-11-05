import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type SandboxResetResponse, sandboxResetEndpoint } from "../endpoint/sandboxResetEndpoint.js"
export function sandboxReset(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<SandboxResetResponse> {
  return porkbunEndpointCall(client, sandboxResetEndpoint, {}, options)
}
