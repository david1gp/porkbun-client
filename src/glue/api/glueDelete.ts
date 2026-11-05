import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type GlueDeleteInput, type GlueDeleteResponse, glueDeleteEndpoint } from "../endpoint/glueDeleteEndpoint.js"
export function glueDelete(
  client: PorkbunClient,
  input: GlueDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<GlueDeleteResponse> {
  return porkbunEndpointCall(client, glueDeleteEndpoint, input, options)
}
