import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainContactUpdateInput,
  type DomainContactUpdateResponse,
  domainContactUpdateEndpoint,
} from "../endpoint/domainContactUpdateEndpoint.js"
export function domainContactUpdate(
  client: PorkbunClient,
  input: DomainContactUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainContactUpdateResponse> {
  return porkbunEndpointCall(client, domainContactUpdateEndpoint, input, options)
}
