import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type SandboxTopupResponse, sandboxTopupEndpoint } from "../endpoint/sandboxTopupEndpoint.js"
export function sandboxTopup(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<SandboxTopupResponse> {
  return porkbunEndpointCall(client, sandboxTopupEndpoint, {}, options)
}
