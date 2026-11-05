import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type DnsPreflightInput,
  type DnsPreflightResponse,
  dnsPreflightEndpoint,
} from "../endpoint/dnsPreflightEndpoint.js"
export function dnsPreflight(
  client: PorkbunClient,
  input: DnsPreflightInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsPreflightResponse> {
  return porkbunEndpointCall(client, dnsPreflightEndpoint, input, options)
}
