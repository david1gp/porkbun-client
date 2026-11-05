import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainContactListInput,
  type DomainContactListResponse,
  domainContactListEndpoint,
} from "../endpoint/domainContactListEndpoint.js"
export function domainContactList(
  client: PorkbunClient,
  input: DomainContactListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainContactListResponse> {
  return porkbunEndpointCall(client, domainContactListEndpoint, input, options)
}
