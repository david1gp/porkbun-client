import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const dnsPreflightEndpoint = porkbunEndpointDefine({
  op: "dnsPreflight",
  method: "GET",
  path: "/dns/preflight/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Check whether a change will break the domain",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    intent: a.optional(
      a.pipe(
        a.picklist(["general", "move-nameservers", "transfer-out", "enable-dnssec"]),
        a.description(
          "What you are about to do. One of general, move-nameservers, transfer-out, enable-dnssec. May also be sent in the request body.",
        ),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    intent: a.optional(a.string()),
    safe: a.optional(a.boolean()),
    blockers: a.optional(a.array(a.string())),
    warnings: a.optional(a.array(a.string())),
    checks: a.optional(
      a.array(
        a.looseObject({
          id: a.optional(a.string()),
          severity: a.optional(a.picklist(["blocker", "warning", "info"])),
          ok: a.optional(a.boolean()),
          title: a.optional(a.string()),
          detail: a.optional(a.string()),
          next_action: a.optional(a.string()),
        }),
      ),
    ),
  }),
})
export type DnsPreflightInput = PorkbunEndpointInput<typeof dnsPreflightEndpoint>
export type DnsPreflightResponse = PorkbunEndpointOutput<typeof dnsPreflightEndpoint>
