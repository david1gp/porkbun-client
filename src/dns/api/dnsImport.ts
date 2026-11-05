import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type DnsImportInput, type DnsImportResponse, dnsImportEndpoint } from "../endpoint/dnsImportEndpoint.js"
export function dnsImport(
  client: PorkbunClient,
  input: DnsImportInput,
  options?: PorkbunRequestOptions,
): PromiseResult<DnsImportResponse> {
  return porkbunEndpointCall(client, dnsImportEndpoint, input, options)
}
