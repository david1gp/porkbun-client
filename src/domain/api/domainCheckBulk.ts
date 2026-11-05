import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainCheckBulkInput,
  type DomainCheckBulkResponse,
  domainCheckBulkEndpoint,
} from "../endpoint/domainCheckBulkEndpoint.js"
export function domainCheckBulk(
  client: PorkbunClient,
  input: DomainCheckBulkInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainCheckBulkResponse> {
  return porkbunEndpointCall(client, domainCheckBulkEndpoint, input, options)
}
