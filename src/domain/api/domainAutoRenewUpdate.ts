import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainAutoRenewUpdateInput,
  type DomainAutoRenewUpdateResponse,
  domainAutoRenewUpdateEndpoint,
} from "../endpoint/domainAutoRenewUpdateEndpoint.js"
export function domainAutoRenewUpdate(
  client: PorkbunClient,
  input: DomainAutoRenewUpdateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainAutoRenewUpdateResponse> {
  return porkbunEndpointCall(client, domainAutoRenewUpdateEndpoint, input, options)
}
