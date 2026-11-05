import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"

export const accountTopupCryptoEndpoint = porkbunEndpointDefine({
  op: "accountTopupCrypto",
  method: "POST",
  path: "/account/topupCrypto",
  auth: "required",
  scope: "funding",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Top up credit with USDC (x402)",
  inputSchema: a.object({
    amount: a.pipe(
      a.pipe(a.number(), a.integer(), a.minValue(100), a.maxValue(50000)),
      a.description(
        "Checkout amount in integer US cents, $1.00 to $500.00 (100 = $1.00). Credit is this less Coinbase's fee of about 1%.",
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Check eligibility only; creates no checkout."))),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.optional(a.string()),
      checkoutId: a.optional(a.string()),
      amount_cents: a.optional(a.pipe(a.number(), a.integer())),
      estimatedFee_cents: a.optional(a.pipe(a.number(), a.integer())),
      estimatedCredit_cents: a.optional(a.pipe(a.number(), a.integer())),
      currency: a.optional(a.string()),
      network: a.optional(a.string()),
      payUrl: a.optional(a.string()),
      x402Url: a.optional(a.nullable(a.string())),
      expiresAt: a.optional(a.nullable(a.string())),
      message: a.optional(a.string()),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type AccountTopupCryptoInput = PorkbunEndpointInput<typeof accountTopupCryptoEndpoint>
export type AccountTopupCryptoResponse = PorkbunEndpointOutput<typeof accountTopupCryptoEndpoint>
