import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareRecordSchema } from "../schema/cloudflareRecordSchema.js"

export const cloudflareRecordListEndpoint = porkbunEndpointDefine({
  op: "cloudflareRecordList",
  method: "GET",
  path: "/cloudflare/getRecords/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List the domain's live DNS records at Cloudflare",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    record: a.optional(cloudflareRecordSchema),
    previous: a.optional(cloudflareRecordSchema),
    records: a.optional(a.array(cloudflareRecordSchema)),
  }),
})
export type CloudflareRecordListInput = PorkbunEndpointInput<typeof cloudflareRecordListEndpoint>
export type CloudflareRecordListResponse = PorkbunEndpointOutput<typeof cloudflareRecordListEndpoint>
