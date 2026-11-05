import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnssecRecordDeleteInput,
  type DnssecRecordDeleteResponse,
  dnssecRecordDeleteEndpoint,
} from "../endpoint/dnssecRecordDeleteEndpoint.js"
export function dnssecRecordDelete(
  client: PorkbunClient,
  input: DnssecRecordDeleteInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnssecRecordDeleteResponse> {
  return porkbunEndpointCall(client, dnssecRecordDeleteEndpoint, input, options)
}
