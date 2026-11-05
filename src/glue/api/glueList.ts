import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type GlueListInput, type GlueListResponse, glueListEndpoint } from "../endpoint/glueListEndpoint.js"
export function glueList(
  client: PorkbunClient,
  input: GlueListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<GlueListResponse> {
  return porkbunEndpointCall(client, glueListEndpoint, input, options)
}
