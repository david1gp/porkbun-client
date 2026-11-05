import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordListByNameTypeInput,
  type DnsRecordListByNameTypeResponse,
  dnsRecordListByNameTypeEndpoint,
} from "../endpoint/dnsRecordListByNameTypeEndpoint.js"
export function dnsRecordListByNameType(
  client: PorkbunClient,
  input: DnsRecordListByNameTypeInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordListByNameTypeResponse> {
  return porkbunEndpointCall(client, dnsRecordListByNameTypeEndpoint, input, options)
}
