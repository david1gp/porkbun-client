import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareMoveStatusSchema } from "../schema/cloudflareMoveStatusSchema.js"

import { cloudflareWriteResponseSchemaCreate } from "../schema/cloudflareWriteResponseSchemaCreate.js"

export const cloudflareMoveRetryEndpoint = porkbunEndpointDefine({
  op: "cloudflareMoveRetry",
  method: "POST",
  path: "/cloudflare/retry/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Retry a failed or skipped domain",
  // dryRun is documented in the operation prose, but missing from requestBody.
  inputSchema: a.object({
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without making changes"))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: cloudflareWriteResponseSchemaCreate({
    ...cloudflareMoveStatusSchema.entries,
    move: a.optional(cloudflareMoveStatusSchema),
  }),
})
export type CloudflareMoveRetryInput = PorkbunEndpointInput<typeof cloudflareMoveRetryEndpoint>
export type CloudflareMoveRetryResponse = PorkbunEndpointOutput<typeof cloudflareMoveRetryEndpoint>
