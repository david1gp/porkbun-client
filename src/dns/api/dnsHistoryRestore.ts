import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsHistoryRestoreInput,
  type DnsHistoryRestoreResponse,
  dnsHistoryRestoreEndpoint,
} from "../endpoint/dnsHistoryRestoreEndpoint.js"
export function dnsHistoryRestore(
  client: PorkbunClient,
  input: DnsHistoryRestoreInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsHistoryRestoreResponse> {
  return porkbunEndpointCall(client, dnsHistoryRestoreEndpoint, input, options)
}
