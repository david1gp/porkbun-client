import * as a from "valibot"

export const porkbunDryRunPreviewSchema = a.looseObject({
  status: a.string(),
  dryRun: a.boolean(),
  wouldSucceed: a.boolean(),
  operation: a.picklist(["registration", "renewal", "transfer"]),
  domain: a.string(),
  tld: a.optional(a.string()),
  available: a.optional(a.string()),
  premium: a.optional(a.boolean()),
  duration: a.optional(a.pipe(a.number(), a.integer())),
  cost: a.pipe(a.number(), a.integer()),
  costDisplay: a.optional(a.string()),
  balance: a.optional(a.pipe(a.number(), a.integer())),
  sufficientFunds: a.optional(a.boolean()),
  monthlySpendLimit: a.optional(a.pipe(a.number(), a.integer())),
  monthlySpendSoFar: a.optional(a.pipe(a.number(), a.integer())),
  withinMonthlySpendLimit: a.optional(a.boolean()),
  message: a.optional(a.string()),
  requestId: a.optional(a.string()),
})
export type PorkbunDryRunPreview = a.InferOutput<typeof porkbunDryRunPreviewSchema>
