import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareMoveStatusSchema } from "../schema/cloudflareMoveStatusSchema.js"

export const cloudflareMoveGetEndpoint = porkbunEndpointDefine({
  op: "cloudflareMoveGet",
  method: "GET",
  path: "/cloudflare/get/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get the Cloudflare move status for one domain",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    ...cloudflareMoveStatusSchema.entries,
    move: a.optional(cloudflareMoveStatusSchema),
  }),
})
export type CloudflareMoveGetInput = PorkbunEndpointInput<typeof cloudflareMoveGetEndpoint>
export type CloudflareMoveGetResponse = PorkbunEndpointOutput<typeof cloudflareMoveGetEndpoint>
