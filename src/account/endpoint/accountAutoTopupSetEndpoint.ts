import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"

export const accountAutoTopupSetEndpoint = porkbunEndpointDefine({
  op: "accountAutoTopupSet",
  method: "POST",
  path: "/account/autoTopup",
  auth: "required",
  scope: "funding",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Configure auto top-up",
  inputSchema: a.object({
    enabled: a.pipe(a.boolean(), a.description("Turn auto top-up on or off. Omit to change only the amount.")),
    threshold: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description(
          "Balance in integer US cents below which a top-up fires. Required when enabling, and meaningless without it.",
        ),
      ),
    ),
    amount: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description(
          "What a top-up adds, in integer US cents. Can be sent on its own; required when enabling if none is on file. Over the API: 500-50000.",
        ),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate only; change nothing."))),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.optional(a.string()),
      enabled: a.optional(a.boolean()),
      threshold: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
      amount: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
      effectiveAmount: a.optional(a.pipe(a.number(), a.integer())),
      defaultAmount: a.optional(a.pipe(a.number(), a.integer())),
      paymentMethodOnFile: a.optional(a.boolean()),
      cards: a.optional(
        a.array(
          a.looseObject({
            role: a.optional(a.picklist(["primary", "backup"])),
            type: a.optional(a.picklist(["card", "link"])),
            brand: a.optional(a.string()),
            last4: a.optional(a.nullable(a.string())),
            expMonth: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
            expYear: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
            nickname: a.optional(a.nullable(a.string())),
            status: a.optional(a.picklist(["active", "expired", "declined"])),
            lastDeclineCode: a.optional(a.nullable(a.string())),
            retryAfter: a.optional(a.nullable(a.string())),
            usedForTopups: a.optional(a.boolean()),
          }),
        ),
      ),
      balance: a.optional(a.pipe(a.number(), a.integer())),
      chargesToday: a.optional(a.pipe(a.number(), a.integer())),
      chargesThisMonth: a.optional(a.pipe(a.number(), a.integer())),
      maxChargesPerDay: a.optional(a.pipe(a.number(), a.integer())),
      maxChargesPerMonth: a.optional(a.pipe(a.number(), a.integer())),
      warnings: a.optional(a.array(a.string())),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type AccountAutoTopupSetInput = PorkbunEndpointInput<typeof accountAutoTopupSetEndpoint>
export type AccountAutoTopupSetResponse = PorkbunEndpointOutput<typeof accountAutoTopupSetEndpoint>
