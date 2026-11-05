import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const emailMailboxRenewEndpoint = porkbunEndpointDefine({
  op: "emailMailboxRenew",
  method: "POST",
  path: "/email/renewMailbox/{domain}",
  auth: "required",
  scope: "purchase",
  agent: { safe: false, cost: true, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Renew a mailbox for a year",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    mailboxId: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("mailboxId"))),
    address: a.optional(a.pipe(a.string(), a.description("The mailbox address, or the part before the @"))),
    cost: a.pipe(a.pipe(a.number(), a.integer()), a.description("cost")),
    agreeToTerms: a.pipe(a.picklist(["yes"]), a.description("agreeToTerms")),
    payWith: a.optional(a.pipe(a.picklist(["card", "usdc"]), a.description("payWith"))),
    cardPaymentId: a.optional(a.pipe(a.string(), a.description("cardPaymentId"))),
    usdcCheckoutId: a.optional(a.pipe(a.string(), a.description("usdcCheckoutId"))),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    mailbox: a.optional(a.record(a.string(), a.unknown())),
    orderId: a.optional(a.pipe(a.number(), a.integer())),
    charged: a.optional(a.pipe(a.number(), a.integer())),
    message: a.optional(a.string()),
  }),
})
export type EmailMailboxRenewInput = PorkbunEndpointInput<typeof emailMailboxRenewEndpoint>
export type EmailMailboxRenewResponse = PorkbunEndpointOutput<typeof emailMailboxRenewEndpoint>
