import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioCreateInput,
  type LinkInBioCreateResponse,
  linkInBioCreateEndpoint,
} from "../endpoint/linkInBioCreateEndpoint.js"
export function linkInBioCreate(
  client: PorkbunClient,
  input: LinkInBioCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioCreateResponse> {
  return porkbunEndpointCall(client, linkInBioCreateEndpoint, input, options)
}
