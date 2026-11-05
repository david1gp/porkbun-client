import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingStagingPublishInput,
  type HostingStagingPublishResponse,
  hostingStagingPublishEndpoint,
} from "../endpoint/hostingStagingPublishEndpoint.js"
export function hostingStagingPublish(
  client: PorkbunClient,
  input: HostingStagingPublishInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingStagingPublishResponse> {
  return porkbunEndpointCall(client, hostingStagingPublishEndpoint, input, options)
}
