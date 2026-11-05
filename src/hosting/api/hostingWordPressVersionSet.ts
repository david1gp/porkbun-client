import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type HostingWordPressVersionSetInput,
  type HostingWordPressVersionSetResponse,
  hostingWordPressVersionSetEndpoint,
} from "../endpoint/hostingWordPressVersionSetEndpoint.js"
export function hostingWordPressVersionSet(
  client: PorkbunClient,
  input: HostingWordPressVersionSetInput,
  options?: PorkbunRequestOptions,
): PromiseResult<HostingWordPressVersionSetResponse> {
  return porkbunEndpointCall(client, hostingWordPressVersionSetEndpoint, input, options)
}
