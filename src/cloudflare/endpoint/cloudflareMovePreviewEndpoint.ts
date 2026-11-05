import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareRecordSchema } from "../schema/cloudflareRecordSchema.js"

export const cloudflareMovePreviewEndpoint = porkbunEndpointDefine({
  op: "cloudflareMovePreview",
  method: "GET",
  path: "/cloudflare/preview/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Preview exactly which records a move would copy",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    records: a.optional(a.array(cloudflareRecordSchema)),
    skipped: a.optional(a.array(cloudflareRecordSchema)),
  }),
})
export type CloudflareMovePreviewInput = PorkbunEndpointInput<typeof cloudflareMovePreviewEndpoint>
export type CloudflareMovePreviewResponse = PorkbunEndpointOutput<typeof cloudflareMovePreviewEndpoint>
