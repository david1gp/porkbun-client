import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnssecRecordListInput,
  type DnssecRecordListResponse,
  dnssecRecordListEndpoint,
} from "../endpoint/dnssecRecordListEndpoint.js"
export function dnssecRecordList(
  client: PorkbunClient,
  input: DnssecRecordListInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnssecRecordListResponse> {
  return porkbunEndpointCall(client, dnssecRecordListEndpoint, input, options)
}
