import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareMoveStatusSchema } from "../schema/cloudflareMoveStatusSchema.js"

export const cloudflareConnectEndpoint = porkbunEndpointDefine({
  op: "cloudflareConnect",
  method: "POST",
  path: "/cloudflare/connect",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Queue domains to move to the customer's Cloudflare account",
  inputSchema: a.object({
    domains: a.pipe(
      a.pipe(a.array(a.string()), a.minLength(1), a.maxLength(500)),
      a.description("Domain names to move. A comma-separated string is also accepted."),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate and return per-domain verdicts without queueing."))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    queued: a.optional(a.array(a.union([a.string(), cloudflareMoveStatusSchema]))),
    skipped: a.optional(a.array(a.union([a.string(), cloudflareMoveStatusSchema]))),
    alreadyQueued: a.optional(a.array(a.union([a.string(), cloudflareMoveStatusSchema]))),
    dryRun: a.optional(a.boolean()),
  }),
})
export type CloudflareConnectInput = PorkbunEndpointInput<typeof cloudflareConnectEndpoint>
export type CloudflareConnectResponse = PorkbunEndpointOutput<typeof cloudflareConnectEndpoint>
