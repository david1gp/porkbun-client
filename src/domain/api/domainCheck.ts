import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainCheckInput,
  type DomainCheckResponse,
  domainCheckEndpoint,
} from "../endpoint/domainCheckEndpoint.js"
export function domainCheck(
  client: PorkbunClient,
  input: DomainCheckInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainCheckResponse> {
  return porkbunEndpointCall(client, domainCheckEndpoint, input, options)
}
