import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsHistoryListInput,
  type DnsHistoryListResponse,
  dnsHistoryListEndpoint,
} from "../endpoint/dnsHistoryListEndpoint.js"
export function dnsHistoryList(
  client: PorkbunClient,
  input: DnsHistoryListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsHistoryListResponse> {
  return porkbunEndpointCall(client, dnsHistoryListEndpoint, input, options)
}
