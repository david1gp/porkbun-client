import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareRecordInputSchema } from "../schema/cloudflareRecordInputSchema.js"
import { cloudflareRecordSchema } from "../schema/cloudflareRecordSchema.js"

import { cloudflareWriteResponseSchemaCreate } from "../schema/cloudflareWriteResponseSchemaCreate.js"

export const cloudflareRecordCreateEndpoint = porkbunEndpointDefine({
  op: "cloudflareRecordCreate",
  method: "POST",
  path: "/cloudflare/createRecord/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Create a DNS record in the domain's Cloudflare zone",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    ...cloudflareRecordInputSchema.entries,
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
export type CloudflareRecordCreateInput = PorkbunEndpointInput<typeof cloudflareRecordCreateEndpoint>
export type CloudflareRecordCreateResponse = PorkbunEndpointOutput<typeof cloudflareRecordCreateEndpoint>
