import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsRecordGetInput,
  type DnsRecordGetResponse,
  dnsRecordGetEndpoint,
} from "../endpoint/dnsRecordGetEndpoint.js"
export function dnsRecordGet(
  client: PorkbunClient,
  input: DnsRecordGetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsRecordGetResponse> {
  return porkbunEndpointCall(client, dnsRecordGetEndpoint, input, options)
}
