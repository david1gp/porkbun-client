import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioSocialsUpdateInput,
  type LinkInBioSocialsUpdateResponse,
  linkInBioSocialsUpdateEndpoint,
} from "../endpoint/linkInBioSocialsUpdateEndpoint.js"
export function linkInBioSocialsUpdate(
  client: PorkbunClient,
  input: LinkInBioSocialsUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioSocialsUpdateResponse> {
  return porkbunEndpointCall(client, linkInBioSocialsUpdateEndpoint, input, options)
}
