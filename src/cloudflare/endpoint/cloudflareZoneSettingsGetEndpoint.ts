import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

import { cloudflareZoneSettingsSchema } from "../schema/cloudflareZoneSettingsSchema.js"

export const cloudflareZoneSettingsGetEndpoint = porkbunEndpointDefine({
  op: "cloudflareZoneSettingsGet",
  method: "GET",
  path: "/cloudflare/getZoneSettings/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Read the zone settings that matter after a move",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    settings: a.optional(cloudflareZoneSettingsSchema),
  }),
})
export type CloudflareZoneSettingsGetInput = PorkbunEndpointInput<typeof cloudflareZoneSettingsGetEndpoint>
export type CloudflareZoneSettingsGetResponse = PorkbunEndpointOutput<typeof cloudflareZoneSettingsGetEndpoint>
