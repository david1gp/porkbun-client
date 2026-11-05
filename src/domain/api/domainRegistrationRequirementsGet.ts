import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainRegistrationRequirementsGetInput,
  type DomainRegistrationRequirementsGetResponse,
  domainRegistrationRequirementsGetEndpoint,
} from "../endpoint/domainRegistrationRequirementsGetEndpoint.js"
export function domainRegistrationRequirementsGet(
  client: PorkbunClient,
  input: DomainRegistrationRequirementsGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainRegistrationRequirementsGetResponse> {
  return porkbunEndpointCall(client, domainRegistrationRequirementsGetEndpoint, input, options)
}
