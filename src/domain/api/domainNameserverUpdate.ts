import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainNameserverUpdateInput,
  type DomainNameserverUpdateResponse,
  domainNameserverUpdateEndpoint,
} from "../endpoint/domainNameserverUpdateEndpoint.js"
export function domainNameserverUpdate(
  client: PorkbunClient,
  input: DomainNameserverUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainNameserverUpdateResponse> {
  return porkbunEndpointCall(client, domainNameserverUpdateEndpoint, input, options)
}
