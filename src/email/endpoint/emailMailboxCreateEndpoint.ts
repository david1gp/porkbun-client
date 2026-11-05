import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"
export const emailMailboxCreateEndpoint = porkbunEndpointDefine({
  op: "emailMailboxCreate",
  method: "POST",
  path: "/email/createMailbox/{domain}",
  auth: "required",
  scope: "purchase",
  agent: { safe: false, cost: true, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Buy and set up a mailbox",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    address: a.pipe(
      a.string(),
      a.description("The part before the @ (`me`) or the whole address. 1-30 characters: letters, digits and + . - _"),
    ),
    password: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Optional. 12-72 bytes with an upper case letter, a lower case letter, a number and a special character. Leave out to have a strong one generated and returned once",
        ),
      ),
    ),
    confirmDnsChanges: a.optional(
      a.pipe(a.boolean(), a.description("Agree to DNS changes a DNS_CHANGE_CONFIRMATION_REQUIRED response described")),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("dryRun"))),
    cost: a.pipe(a.pipe(a.number(), a.integer()), a.description("The price in cents, 3600")),
    agreeToTerms: a.pipe(a.picklist(["yes"]), a.description("agreeToTerms")),
    payWith: a.optional(
      a.pipe(
        a.picklist(["card", "usdc"]),
        a.description("Pay directly instead of from account credit; see /domain/create"),
      ),
    ),
    cardPaymentId: a.optional(a.pipe(a.string(), a.description("cardPaymentId"))),
    usdcCheckoutId: a.optional(a.pipe(a.string(), a.description("usdcCheckoutId"))),
  }),
  responseSchema: a.union([
    porkbunDryRunPreviewSchema,
    a.looseObject({
      status: a.optional(a.string()),
      domain: a.optional(a.string()),
      mailbox: a.optional(
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
      password: a.optional(a.string()),
      passwordGenerated: a.optional(a.boolean()),
      dnsChanges: a.optional(a.record(a.string(), a.unknown())),
      clientSettings: a.optional(a.record(a.string(), a.unknown())),
      orderId: a.optional(a.pipe(a.number(), a.integer())),
      charged: a.optional(a.pipe(a.number(), a.integer())),
      message: a.optional(a.string()),
    }),
  ]),
})
export type EmailMailboxCreateInput = PorkbunEndpointInput<typeof emailMailboxCreateEndpoint>
export type EmailMailboxCreateResponse = PorkbunEndpointOutput<typeof emailMailboxCreateEndpoint>
