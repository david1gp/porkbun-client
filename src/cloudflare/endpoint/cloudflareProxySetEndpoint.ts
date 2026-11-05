import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareRecordSchema } from "../schema/cloudflareRecordSchema.js"

import { cloudflareWriteResponseSchemaCreate } from "../schema/cloudflareWriteResponseSchemaCreate.js"

export const cloudflareProxySetEndpoint = porkbunEndpointDefine({
  op: "cloudflareProxySet",
  method: "POST",
  path: "/cloudflare/setProxy/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Turn the Cloudflare proxy (orange cloud) on or off",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    enabled: a.pipe(
      a.boolean(),
      a.description("true = proxy through Cloudflare (orange cloud); false = DNS-only (grey cloud)."),
    ),
    records: a.optional(
      a.pipe(
        a.array(a.string()),
        a.description('Optional. Limit to these names; "@" = apex, bare labels are expanded.'),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
  }),
  responseSchema: cloudflareWriteResponseSchemaCreate({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    applied: a.optional(a.array(cloudflareRecordSchema)),
    updated: a.optional(a.array(cloudflareRecordSchema)),
    skipped: a.optional(a.array(cloudflareRecordSchema)),
    warnings: a.optional(a.array(a.string())),
  }),
})
export type CloudflareProxySetInput = PorkbunEndpointInput<typeof cloudflareProxySetEndpoint>
export type CloudflareProxySetResponse = PorkbunEndpointOutput<typeof cloudflareProxySetEndpoint>
