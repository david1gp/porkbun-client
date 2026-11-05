import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordEditInput,
  type DnsRecordEditResponse,
  dnsRecordEditEndpoint,
} from "../endpoint/dnsRecordEditEndpoint.js"
export function dnsRecordEdit(
  client: PorkbunClient,
  input: DnsRecordEditInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordEditResponse> {
  return porkbunEndpointCall(client, dnsRecordEditEndpoint, input, options)
}
