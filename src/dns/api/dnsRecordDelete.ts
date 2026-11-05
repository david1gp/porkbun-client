import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordDeleteInput,
  type DnsRecordDeleteResponse,
  dnsRecordDeleteEndpoint,
} from "../endpoint/dnsRecordDeleteEndpoint.js"
export function dnsRecordDelete(
  client: PorkbunClient,
  input: DnsRecordDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordDeleteResponse> {
  return porkbunEndpointCall(client, dnsRecordDeleteEndpoint, input, options)
}
