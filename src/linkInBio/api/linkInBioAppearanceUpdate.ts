import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioAppearanceUpdateInput,
  type LinkInBioAppearanceUpdateResponse,
  linkInBioAppearanceUpdateEndpoint,
} from "../endpoint/linkInBioAppearanceUpdateEndpoint.js"
export function linkInBioAppearanceUpdate(
  client: PorkbunClient,
  input: LinkInBioAppearanceUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioAppearanceUpdateResponse> {
  return porkbunEndpointCall(client, linkInBioAppearanceUpdateEndpoint, input, options)
}
