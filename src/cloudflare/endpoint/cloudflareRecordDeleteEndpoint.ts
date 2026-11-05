import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareRecordSchema } from "../schema/cloudflareRecordSchema.js"

import { cloudflareWriteResponseSchemaCreate } from "../schema/cloudflareWriteResponseSchemaCreate.js"

export const cloudflareRecordDeleteEndpoint = porkbunEndpointDefine({
  op: "cloudflareRecordDelete",
  method: "POST",
  path: "/cloudflare/deleteRecord/{domain}/{recordId}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Delete a DNS record from the domain's Cloudflare zone",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    recordId: a.pipe(a.string(), a.description("Cloudflare record id from /cloudflare/getRecords.")),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
  }),
  responseSchema: cloudflareWriteResponseSchemaCreate({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    record: a.optional(cloudflareRecordSchema),
    previous: a.optional(cloudflareRecordSchema),
    records: a.optional(a.array(cloudflareRecordSchema)),
  }),
})
export type CloudflareRecordDeleteInput = PorkbunEndpointInput<typeof cloudflareRecordDeleteEndpoint>
export type CloudflareRecordDeleteResponse = PorkbunEndpointOutput<typeof cloudflareRecordDeleteEndpoint>
