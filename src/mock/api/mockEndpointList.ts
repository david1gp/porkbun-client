import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { type MockEndpointListResponse, mockEndpointListEndpoint } from "../endpoint/mockEndpointListEndpoint.js"
export function mockEndpointList(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<MockEndpointListResponse> {
  return porkbunEndpointCall(client, mockEndpointListEndpoint, {}, options)
}
