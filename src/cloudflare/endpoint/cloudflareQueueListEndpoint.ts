import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareMoveStatusSchema } from "../schema/cloudflareMoveStatusSchema.js"

export const cloudflareQueueListEndpoint = porkbunEndpointDefine({
  op: "cloudflareQueueList",
  method: "GET",
  path: "/cloudflare/getQueue",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List every Cloudflare move for the account",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    queue: a.optional(a.array(cloudflareMoveStatusSchema)),
  }),
})
export type CloudflareQueueListInput = PorkbunEndpointInput<typeof cloudflareQueueListEndpoint>
export type CloudflareQueueListResponse = PorkbunEndpointOutput<typeof cloudflareQueueListEndpoint>
