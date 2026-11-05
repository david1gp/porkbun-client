import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordListInput,
  type DnsRecordListResponse,
  dnsRecordListEndpoint,
} from "../endpoint/dnsRecordListEndpoint.js"
export function dnsRecordList(
  client: PorkbunClient,
  input: DnsRecordListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordListResponse> {
  return porkbunEndpointCall(client, dnsRecordListEndpoint, input, options)
}
