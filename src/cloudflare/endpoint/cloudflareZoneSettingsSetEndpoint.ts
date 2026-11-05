import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { cloudflareWriteResponseSchemaCreate } from "../schema/cloudflareWriteResponseSchemaCreate.js"
import { cloudflareZoneSettingsSchema } from "../schema/cloudflareZoneSettingsSchema.js"

export const cloudflareZoneSettingsSetEndpoint = porkbunEndpointDefine({
  op: "cloudflareZoneSettingsSet",
  method: "POST",
  path: "/cloudflare/setZoneSettings/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Change zone settings (allowlisted)",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    ...cloudflareZoneSettingsSchema.entries,
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
  }),
  responseSchema: cloudflareWriteResponseSchemaCreate({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    settings: a.optional(cloudflareZoneSettingsSchema),
    applied: a.optional(cloudflareZoneSettingsSchema),
    failed: a.optional(a.record(a.string(), a.string())),
    warnings: a.optional(a.array(a.string())),
  }),
})
export type CloudflareZoneSettingsSetInput = PorkbunEndpointInput<typeof cloudflareZoneSettingsSetEndpoint>
export type CloudflareZoneSettingsSetResponse = PorkbunEndpointOutput<typeof cloudflareZoneSettingsSetEndpoint>
