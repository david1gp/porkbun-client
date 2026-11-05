import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordEditByNameTypeInput,
  type DnsRecordEditByNameTypeResponse,
  dnsRecordEditByNameTypeEndpoint,
} from "../endpoint/dnsRecordEditByNameTypeEndpoint.js"
export function dnsRecordEditByNameType(
  client: PorkbunClient,
  input: DnsRecordEditByNameTypeInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordEditByNameTypeResponse> {
  return porkbunEndpointCall(client, dnsRecordEditByNameTypeEndpoint, input, options)
}
