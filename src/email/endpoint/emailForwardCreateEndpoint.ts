import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const emailForwardCreateEndpoint = porkbunEndpointDefine({
  op: "emailForwardCreate",
  method: "POST",
  path: "/email/addForward/{domain}",
  auth: "required",
  scope: "email",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Add an email forward",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    address: a.pipe(
      a.string(),
      a.description(
        "The address at the domain to forward: the part before the @ (`info`) or the whole address (`info@example.com`)",
      ),
    ),
    forwardTo: a.pipe(a.string(), a.description("The mailbox to deliver to")),
    confirmDnsChanges: a.optional(
      a.pipe(
        a.boolean(),
        a.description("Agree to the DNS changes a DNS_CHANGE_CONFIRMATION_REQUIRED response described"),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    address: a.optional(a.string()),
    forwardTo: a.optional(a.string()),
    dnsChanges: a.optional(
      a.looseObject({
        mxRecordsRemoved: a.optional(
          a.array(
            a.looseObject({
              id: a.optional(a.string()),
              content: a.optional(a.string()),
              prio: a.optional(a.string()),
            }),
          ),
        ),
        spf: a.optional(a.picklist(["set", "merge", "unchanged", "unchanged_over_limits"])),
        spfBefore: a.optional(a.string()),
        spfAfter: a.optional(a.string()),
      }),
    ),
    limits: a.optional(
      a.looseObject({
        used: a.optional(a.pipe(a.number(), a.integer())),
        max: a.optional(a.pipe(a.number(), a.integer())),
      }),
    ),
  }),
})
export type EmailForwardCreateInput = PorkbunEndpointInput<typeof emailForwardCreateEndpoint>
export type EmailForwardCreateResponse = PorkbunEndpointOutput<typeof emailForwardCreateEndpoint>
