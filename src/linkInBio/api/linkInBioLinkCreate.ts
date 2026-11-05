import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioLinkCreateInput,
  type LinkInBioLinkCreateResponse,
  linkInBioLinkCreateEndpoint,
} from "../endpoint/linkInBioLinkCreateEndpoint.js"
export function linkInBioLinkCreate(
  client: PorkbunClient,
  input: LinkInBioLinkCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioLinkCreateResponse> {
  return porkbunEndpointCall(client, linkInBioLinkCreateEndpoint, input, options)
}
