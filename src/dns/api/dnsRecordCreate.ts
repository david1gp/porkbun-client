import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordCreateInput,
  type DnsRecordCreateResponse,
  dnsRecordCreateEndpoint,
} from "../endpoint/dnsRecordCreateEndpoint.js"
export function dnsRecordCreate(
  client: PorkbunClient,
  input: DnsRecordCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordCreateResponse> {
  return porkbunEndpointCall(client, dnsRecordCreateEndpoint, input, options)
}
