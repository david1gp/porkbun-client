import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioSettingsUpdateInput,
  type LinkInBioSettingsUpdateResponse,
  linkInBioSettingsUpdateEndpoint,
} from "../endpoint/linkInBioSettingsUpdateEndpoint.js"
export function linkInBioSettingsUpdate(
  client: PorkbunClient,
  input: LinkInBioSettingsUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioSettingsUpdateResponse> {
  return porkbunEndpointCall(client, linkInBioSettingsUpdateEndpoint, input, options)
}
