import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const emailMailboxListEndpoint = porkbunEndpointDefine({
  op: "emailMailboxList",
  method: "POST",
  path: "/email/getMailboxes/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List mailboxes",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    mailboxes: a.optional(
      a.array(
        a.looseObject({
          id: a.optional(a.pipe(a.number(), a.integer())),
          address: a.optional(a.nullable(a.string())),
          status: a.optional(a.picklist(["PENDINGSETUP", "ACTIVE", "SUSPENDED", "PAUSED"])),
          trial: a.optional(a.boolean()),
          expires: a.optional(a.string()),
          quota: a.optional(a.string()),
          autoRenews: a.optional(a.boolean()),
          renewalPrice: a.optional(a.pipe(a.number(), a.integer())),
        }),
      ),
    ),
    price: a.optional(
      a.looseObject({
        amount: a.optional(a.pipe(a.number(), a.integer())),
        formatted: a.optional(a.string()),
        interval: a.optional(a.string()),
      }),
    ),
    clientSettings: a.optional(a.record(a.string(), a.unknown())),
  }),
})
export type EmailMailboxListInput = PorkbunEndpointInput<typeof emailMailboxListEndpoint>
export type EmailMailboxListResponse = PorkbunEndpointOutput<typeof emailMailboxListEndpoint>
