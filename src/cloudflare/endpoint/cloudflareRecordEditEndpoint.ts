import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareRecordInputSchema } from "../schema/cloudflareRecordInputSchema.js"
import { cloudflareRecordSchema } from "../schema/cloudflareRecordSchema.js"

export const cloudflareRecordEditEndpoint = porkbunEndpointDefine({
  op: "cloudflareRecordEdit",
  method: "POST",
  path: "/cloudflare/editRecord/{domain}/{recordId}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Update a DNS record in the domain's Cloudflare zone",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    recordId: a.pipe(a.string(), a.description("Cloudflare record id from /cloudflare/getRecords.")),
    ...a.partial(cloudflareRecordInputSchema).entries,
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    record: a.optional(cloudflareRecordSchema),
    previous: a.optional(cloudflareRecordSchema),
    records: a.optional(a.array(cloudflareRecordSchema)),
  }),
})
export type CloudflareRecordEditInput = PorkbunEndpointInput<typeof cloudflareRecordEditEndpoint>
export type CloudflareRecordEditResponse = PorkbunEndpointOutput<typeof cloudflareRecordEditEndpoint>
