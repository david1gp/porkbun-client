import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const cloudflareZoneGetEndpoint = porkbunEndpointDefine({
  op: "cloudflareZoneGet",
  method: "GET",
  path: "/cloudflare/getZone/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get live zone state from Cloudflare (and detect nameserver drift)",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    zoneId: a.optional(a.string()),
    domain: a.optional(a.string()),
    zone: a.optional(
      a.looseObject({
        id: a.optional(a.string()),
        name: a.optional(a.string()),
        status: a.optional(a.string()),
        paused: a.optional(a.boolean()),
        nameservers: a.optional(a.array(a.string())),
        activatedOn: a.optional(a.nullable(a.string())),
      }),
    ),
    nameservers: a.optional(a.array(a.string())),
    publicNameservers: a.optional(a.array(a.string())),
    nameserversDrifted: a.optional(a.boolean()),
  }),
})
export type CloudflareZoneGetInput = PorkbunEndpointInput<typeof cloudflareZoneGetEndpoint>
export type CloudflareZoneGetResponse = PorkbunEndpointOutput<typeof cloudflareZoneGetEndpoint>
