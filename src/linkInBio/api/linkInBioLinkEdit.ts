import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioLinkEditInput,
  type LinkInBioLinkEditResponse,
  linkInBioLinkEditEndpoint,
} from "../endpoint/linkInBioLinkEditEndpoint.js"
export function linkInBioLinkEdit(
  client: PorkbunClient,
  input: LinkInBioLinkEditInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioLinkEditResponse> {
  return porkbunEndpointCall(client, linkInBioLinkEditEndpoint, input, options)
}
