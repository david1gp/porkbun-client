import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type GlueUpdateInput, type GlueUpdateResponse, glueUpdateEndpoint } from "../endpoint/glueUpdateEndpoint.js"
export function glueUpdate(
  client: PorkbunClient,
  input: GlueUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<GlueUpdateResponse> {
  return porkbunEndpointCall(client, glueUpdateEndpoint, input, options)
}
