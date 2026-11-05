import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsHistoryDiffInput,
  type DnsHistoryDiffResponse,
  dnsHistoryDiffEndpoint,
} from "../endpoint/dnsHistoryDiffEndpoint.js"
export function dnsHistoryDiff(
  client: PorkbunClient,
  input: DnsHistoryDiffInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsHistoryDiffResponse> {
  return porkbunEndpointCall(client, dnsHistoryDiffEndpoint, input, options)
}
