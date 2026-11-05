import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainNameserverListInput,
  type DomainNameserverListResponse,
  domainNameserverListEndpoint,
} from "../endpoint/domainNameserverListEndpoint.js"
export function domainNameserverList(
  client: PorkbunClient,
  input: DomainNameserverListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainNameserverListResponse> {
  return porkbunEndpointCall(client, domainNameserverListEndpoint, input, options)
}
