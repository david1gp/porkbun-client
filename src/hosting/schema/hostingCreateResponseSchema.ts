import * as a from "valibot"

const provisioned = a.looseObject({
  status: a.optional(a.string()),
  orderId: a.optional(a.pipe(a.number(), a.integer())),
  hosting: a.optional(
    a.looseObject({
      domain: a.optional(a.string()),
      product: a.optional(a.string()),
      plan: a.optional(a.string()),
      server: a.optional(a.string()),
      status: a.optional(a.picklist(["ACTIVE", "PENDING"])),
      trial: a.optional(a.boolean()),
      trialEndsAt: a.optional(a.nullable(a.string())),
      autoRenew: a.optional(a.boolean()),
      sku: a.optional(a.string()),
    }),
  ),
  charged: a.optional(a.pipe(a.number(), a.integer())),
  cost: a.optional(
    a.looseObject({
      amount: a.optional(a.pipe(a.number(), a.integer())),
      formatted: a.optional(a.string()),
      interval: a.optional(a.string()),
    }),
  ),
  message: a.optional(a.string()),
})

// Hosting previews are not domain registration previews: cost is an object, and
// the operation is not registration/renewal/transfer. The mock always returns
// the provisioned example, even with dryRun=true; preview-only fields are optional.
export const hostingCreateResponseSchema = a.union([
  a.looseObject({ ...provisioned.entries, dryRun: a.optional(a.literal(false)) }),
  a.looseObject({
    ...provisioned.entries,
    dryRun: a.literal(true),
    wouldSucceed: a.optional(a.boolean()),
    domain: a.optional(a.string()),
    sku: a.optional(a.string()),
    trial: a.optional(a.boolean()),
    agreeToNameserverChange: a.optional(a.boolean()),
  }),
])
