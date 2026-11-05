import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const cloudflareInventoryListEndpoint = porkbunEndpointDefine({
  op: "cloudflareInventoryList",
  method: "GET",
  path: "/cloudflare/inventory",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List every domain with its Cloudflare eligibility",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    domains: a.optional(
      a.array(
        a.looseObject({
          domain: a.optional(a.string()),
          state: a.optional(a.picklist(["eligible", "warn", "blocked", "connected", "inprogress"])),
          reason: a.optional(a.string()),
        }),
      ),
    ),
  }),
})
export type CloudflareInventoryListInput = PorkbunEndpointInput<typeof cloudflareInventoryListEndpoint>
export type CloudflareInventoryListResponse = PorkbunEndpointOutput<typeof cloudflareInventoryListEndpoint>
