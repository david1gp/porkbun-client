import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const emailMailboxSetupEndpoint = porkbunEndpointDefine({
  op: "emailMailboxSetup",
  method: "POST",
  path: "/email/setupMailbox/{domain}",
  auth: "required",
  scope: "email",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Set up a waiting mailbox",
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
    mailboxId: a.optional(
      a.pipe(a.pipe(a.number(), a.integer()), a.description("Which waiting mailbox (from /email/getMailboxes)")),
    ),
  }),
  responseSchema: a.looseObject({
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
})
export type EmailMailboxSetupInput = PorkbunEndpointInput<typeof emailMailboxSetupEndpoint>
export type EmailMailboxSetupResponse = PorkbunEndpointOutput<typeof emailMailboxSetupEndpoint>
