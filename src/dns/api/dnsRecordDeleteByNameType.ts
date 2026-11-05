import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordDeleteByNameTypeInput,
  type DnsRecordDeleteByNameTypeResponse,
  dnsRecordDeleteByNameTypeEndpoint,
} from "../endpoint/dnsRecordDeleteByNameTypeEndpoint.js"
export function dnsRecordDeleteByNameType(
  client: PorkbunClient,
  input: DnsRecordDeleteByNameTypeInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordDeleteByNameTypeResponse> {
  return porkbunEndpointCall(client, dnsRecordDeleteByNameTypeEndpoint, input, options)
}
