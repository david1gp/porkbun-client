import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"
export const closeoutBuyEndpoint = porkbunEndpointDefine({
  op: "closeoutBuy",
  method: "POST",
  path: "/closeout/buy/{domain}",
  auth: "required",
  scope: "purchase",
  agent: { safe: false, cost: true, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Buy a closeout outright",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    cost: a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description(
        "Exact totalPrice in integer US cents, from /closeout/get/{domain}. Use 0 only with dryRun to request a quote.",
      ),
    ),
    payWith: a.optional(
      a.pipe(
        a.picklist(["usdc", "card"]),
        a.description(
          'Optional. `"usdc"` pays for this purchase directly in USDC on Base over x402 instead of from account credit. The first call answers HTTP 402 (`PAYMENT_REQUIRED`) with Coinbase\'s terms in the `PAYMENT-',
        ),
      ),
    ),
    usdcCheckoutId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "usdc"`: the `checkoutId` from an earlier `PAYMENT_REQUIRED`, once its `x402Url` or `payUrl` has been paid. Send it with otherwise the same request; the purchase completes if the checko',
        ),
      ),
    ),
    cardPaymentId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "card"`: the `cardPaymentId` from an earlier `PAYMENT_REQUIRED`, once its `payUrl` has been paid (the card is then held). Send it with otherwise the same request; the hold is captured i',
        ),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate and price without charging or claiming."))),
  }),
  responseSchema: a.union([
    porkbunDryRunPreviewSchema,
    a.looseObject({
      status: a.optional(a.string()),
      domain: a.optional(a.string()),
      orderId: a.optional(a.pipe(a.number(), a.integer())),
      closeoutId: a.optional(a.pipe(a.number(), a.integer())),
      closeoutPrice: a.optional(a.pipe(a.number(), a.integer())),
      renewalPrice: a.optional(a.pipe(a.number(), a.integer())),
      totalPrice: a.optional(a.pipe(a.number(), a.integer())),
      message: a.optional(a.string()),
    }),
  ]),
})
export type CloseoutBuyInput = PorkbunEndpointInput<typeof closeoutBuyEndpoint>
export type CloseoutBuyResponse = PorkbunEndpointOutput<typeof closeoutBuyEndpoint>
