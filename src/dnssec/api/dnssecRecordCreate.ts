import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnssecRecordCreateInput,
  type DnssecRecordCreateResponse,
  dnssecRecordCreateEndpoint,
} from "../endpoint/dnssecRecordCreateEndpoint.js"
export function dnssecRecordCreate(
  client: PorkbunClient,
  input: DnssecRecordCreateInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnssecRecordCreateResponse> {
  return porkbunEndpointCall(client, dnssecRecordCreateEndpoint, input, options)
}
