import type { PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { PorkbunRequestOptions } from "../../shared/PorkbunRequestOptions.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import {
  type AccountApiSettingsGetResponse,
  accountApiSettingsGetEndpoint,
} from "../endpoint/accountApiSettingsGetEndpoint.js"
export function accountApiSettingsGet(
  client: PorkbunClient,
  options?: PorkbunRequestOptions,
): PromiseResult<AccountApiSettingsGetResponse> {
  return porkbunEndpointCall(client, accountApiSettingsGetEndpoint, {}, options)
}
