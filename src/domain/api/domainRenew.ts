import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainRenewInput,
  type DomainRenewResponse,
  domainRenewEndpoint,
} from "../endpoint/domainRenewEndpoint.js"
export function domainRenew(
  client: PorkbunClient,
  input: DomainRenewInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainRenewResponse> {
  return porkbunEndpointCall(client, domainRenewEndpoint, input, options)
}
