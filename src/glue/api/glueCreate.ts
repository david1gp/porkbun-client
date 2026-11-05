import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type GlueCreateInput, type GlueCreateResponse, glueCreateEndpoint } from "../endpoint/glueCreateEndpoint.js"
export function glueCreate(
  client: PorkbunClient,
  input: GlueCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<GlueCreateResponse> {
  return porkbunEndpointCall(client, glueCreateEndpoint, input, options)
}
