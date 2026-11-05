import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"

export const domainRenewEndpoint = porkbunEndpointDefine({
  op: "domainRenew",
  method: "POST",
  path: "/domain/renew/{domain}",
  auth: "required",
  scope: "purchase",
  agent: { safe: false, cost: true, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Renew a domain",
  inputSchema: a.object({
    cost: a.pipe(
      a.pipe(a.number(), a.integer(), a.minValue(0)),
      a.description(
        "The renewal cost in pennies (USD cents). Must exactly equal the total price for the domain at its minimum renewal duration. Obtain this from /domain/checkDomain",
      ),
    ),
    payWith: a.optional(
      a.pipe(
        a.picklist(["usdc", "card"]),
        a.description(
          'Optional. `"usdc"` pays for this purchase directly in USDC on Base over x402 instead of from account credit. The first call answers HTTP 402 (`PAYMENT_REQUIRED`',
        ),
      ),
    ),
    usdcCheckoutId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "usdc"`: the `checkoutId` from an earlier `PAYMENT_REQUIRED`, once its `x402Url` or `payUrl` has been paid. Send it with otherwise the same reque',
        ),
      ),
    ),
    cardPaymentId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "card"`: the `cardPaymentId` from an earlier `PAYMENT_REQUIRED`, once its `payUrl` has been paid (the card is then held). Send it with otherwise ',
        ),
      ),
    ),
    dryRun: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "Optional. When true, runs all pre-flight validation and returns a preview with `dryRun: true` and `wouldSucceed` WITHOUT renewing or charging. Nothing changes a",
        ),
      ),
    ),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.string(),
      domain: a.string(),
      expirationDate: a.optional(a.string()),
      cost: a.optional(a.pipe(a.number(), a.integer())),
      orderId: a.pipe(a.number(), a.integer()),
      limits: a.optional(
        a.looseObject({
          attempts: a.optional(
            a.looseObject({
              TTL: a.optional(a.pipe(a.number(), a.integer())),
              limit: a.optional(a.pipe(a.number(), a.integer())),
              used: a.optional(a.pipe(a.number(), a.integer())),
              naturalLanguage: a.optional(a.string()),
            }),
          ),
          success: a.optional(
            a.looseObject({
              TTL: a.optional(a.pipe(a.number(), a.integer())),
              limit: a.optional(a.pipe(a.number(), a.integer())),
              used: a.optional(a.pipe(a.number(), a.integer())),
              naturalLanguage: a.optional(a.string()),
            }),
          ),
        }),
      ),
      balance: a.optional(a.pipe(a.number(), a.integer())),
      ttlRemaining: a.optional(a.pipe(a.number(), a.integer())),
      requestId: a.optional(a.string()),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type DomainRenewInput = PorkbunEndpointInput<typeof domainRenewEndpoint>
export type DomainRenewResponse = PorkbunEndpointOutput<typeof domainRenewEndpoint>
