import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type LinkInBioGetInput,
  type LinkInBioGetResponse,
  linkInBioGetEndpoint,
} from "../endpoint/linkInBioGetEndpoint.js"
export function linkInBioGet(
  client: PorkbunClient,
  input: LinkInBioGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<LinkInBioGetResponse> {
  return porkbunEndpointCall(client, linkInBioGetEndpoint, input, options)
}
