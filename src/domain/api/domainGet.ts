import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type DomainGetInput, type DomainGetResponse, domainGetEndpoint } from "../endpoint/domainGetEndpoint.js"
export function domainGet(
  client: PorkbunClient,
  input: DomainGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainGetResponse> {
  return porkbunEndpointCall(client, domainGetEndpoint, input, options)
}
