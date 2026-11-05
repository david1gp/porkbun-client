import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainAutoRenewUpdateEndpoint = porkbunEndpointDefine({
  op: "domainAutoRenewUpdate",
  method: "POST",
  path: "/domain/updateAutoRenew/{domain?}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update auto-renew setting",
  inputSchema: a.object({
    status: a.pipe(a.picklist(["on", "off"]), a.description("Auto-renew status to set")),
    domains: a.optional(
      a.pipe(
        a.array(a.string()),
        a.description(
          "Array of additional domain names to update. Combined with the domain in the URL path if provided.",
        ),
      ),
    ),
    domain: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Optional single domain in URL. Omit or use `/domain/updateAutoRenew/` (without trailing domain) when using the `domains` body array instead.",
        ),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    results: a.optional(
      a.record(a.string(), a.looseObject({ status: a.optional(a.string()), message: a.optional(a.string()) })),
    ),
  }),
})
export type DomainAutoRenewUpdateInput = PorkbunEndpointInput<typeof domainAutoRenewUpdateEndpoint>
export type DomainAutoRenewUpdateResponse = PorkbunEndpointOutput<typeof domainAutoRenewUpdateEndpoint>
