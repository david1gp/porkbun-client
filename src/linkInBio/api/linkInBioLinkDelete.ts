import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioLinkDeleteInput,
  type LinkInBioLinkDeleteResponse,
  linkInBioLinkDeleteEndpoint,
} from "../endpoint/linkInBioLinkDeleteEndpoint.js"
export function linkInBioLinkDelete(
  client: PorkbunClient,
  input: LinkInBioLinkDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioLinkDeleteResponse> {
  return porkbunEndpointCall(client, linkInBioLinkDeleteEndpoint, input, options)
}
