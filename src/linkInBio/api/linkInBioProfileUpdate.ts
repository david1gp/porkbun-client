import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioProfileUpdateInput,
  type LinkInBioProfileUpdateResponse,
  linkInBioProfileUpdateEndpoint,
} from "../endpoint/linkInBioProfileUpdateEndpoint.js"
export function linkInBioProfileUpdate(
  client: PorkbunClient,
  input: LinkInBioProfileUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioProfileUpdateResponse> {
  return porkbunEndpointCall(client, linkInBioProfileUpdateEndpoint, input, options)
}
