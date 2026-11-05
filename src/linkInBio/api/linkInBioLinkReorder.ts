import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioLinkReorderInput,
  type LinkInBioLinkReorderResponse,
  linkInBioLinkReorderEndpoint,
} from "../endpoint/linkInBioLinkReorderEndpoint.js"
export function linkInBioLinkReorder(
  client: PorkbunClient,
  input: LinkInBioLinkReorderInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioLinkReorderResponse> {
  return porkbunEndpointCall(client, linkInBioLinkReorderEndpoint, input, options)
}
