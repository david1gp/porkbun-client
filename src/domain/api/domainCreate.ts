import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DomainCreateInput,
  type DomainCreateResponse,
  domainCreateEndpoint,
} from "../endpoint/domainCreateEndpoint.js"
export function domainCreate(
  client: PorkbunClient,
  input: DomainCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DomainCreateResponse> {
  return porkbunEndpointCall(client, domainCreateEndpoint, input, options)
}
