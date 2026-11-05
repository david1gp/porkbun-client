import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type DomainListInput, type DomainListResponse, domainListEndpoint } from "../endpoint/domainListEndpoint.js"
export function domainList(
  client: PorkbunClient,
  input: DomainListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainListResponse> {
  return porkbunEndpointCall(client, domainListEndpoint, input, options)
}
