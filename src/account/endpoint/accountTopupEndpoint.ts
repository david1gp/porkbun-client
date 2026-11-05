import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"

export const accountTopupEndpoint = porkbunEndpointDefine({
  op: "accountTopup",
  method: "POST",
  path: "/account/topup",
  auth: "required",
  scope: "funding",
  agent: { safe: false, cost: true, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Top up account credit now",
  inputSchema: a.object({
    amount: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description(
          "Optional one-off amount in integer US cents (500-50000). Omit to charge the amount the account has configured, which is the common case. A supplied amount does NOT change the stored setting — use it instead of rewriting the customer's confi",
        ),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Preview the charge without making it."))),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.optional(a.string()),
      charged: a.optional(a.pipe(a.number(), a.integer())),
      chargedDisplay: a.optional(a.string()),
      balance: a.optional(a.pipe(a.number(), a.integer())),
      balanceDisplay: a.optional(a.string()),
      orderId: a.optional(a.pipe(a.number(), a.integer())),
      usedDefaultAmount: a.optional(a.boolean()),
      chargesToday: a.optional(a.pipe(a.number(), a.integer())),
      chargesThisMonth: a.optional(a.pipe(a.number(), a.integer())),
      simulated: a.optional(a.boolean()),
      message: a.optional(a.string()),
      card: a.optional(
        a.looseObject({
          type: a.optional(a.picklist(["card", "link"])),
          brand: a.optional(a.string()),
          last4: a.optional(a.nullable(a.string())),
          expMonth: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          expYear: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
          nickname: a.optional(a.nullable(a.string())),
          usedBackup: a.optional(a.boolean()),
        }),
      ),
      usedBackup: a.optional(a.boolean()),
      declinedFirst: a.optional(
        a.array(
          a.looseObject({
            type: a.optional(a.picklist(["card", "link"])),
            brand: a.optional(a.string()),
            last4: a.optional(a.nullable(a.string())),
            expMonth: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
            expYear: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
            nickname: a.optional(a.nullable(a.string())),
            declineCode: a.optional(a.string()),
          }),
        ),
      ),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type AccountTopupInput = PorkbunEndpointInput<typeof accountTopupEndpoint>
export type AccountTopupResponse = PorkbunEndpointOutput<typeof accountTopupEndpoint>
