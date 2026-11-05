import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"
export const hostingCreateEndpoint = porkbunEndpointDefine({
  op: "hostingCreate",
  method: "POST",
  path: "/hosting/create/{domain}",
  auth: "required",
  scope: "purchase",
  agent: { safe: false, cost: true, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Provision hosting — a static site or a WordPress site",
  inputSchema: a.object({
    sku: a.pipe(
      a.picklist(["PIXIESECURESTATICM2", "PIXIESECURESTATICY2"]),
      a.description(
        "The hosting plan SKU to provision. Discover the provisionable SKUs (and each one’s price/interval/trial) via GET /hosting/plans, then pass the row’s `sku`. Currently Secure Static Hosting: PIXIESECURESTATICM2 ($3.00/mo) or PIXIESECURESTATICY2 ($30.00/yr).",
      ),
    ),
    acknowledgedCost: a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description(
        "Echo the plan price in cents (300 monthly / 3000 yearly) to confirm the account holder understands the auto-renew / charge. Mismatch returns COST_ACKNOWLEDGMENT_REQUIRED.",
      ),
    ),
    agreeToTerms: a.pipe(a.picklist(["yes"]), a.description("agreeToTerms")),
    agreeToNameserverChange: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "Required (true) when the domain is not already on Porkbun nameservers — provisioning will switch them.",
        ),
      ),
    ),
    payWith: a.optional(
      a.pipe(
        a.picklist(["usdc", "card"]),
        a.description(
          'Optional. `"usdc"` pays for this purchase directly in USDC on Base over x402 instead of from account credit. The first call answers HTTP 402 (`PAYMENT_REQUIRED`) with Coinbase\'s terms in the `PAYMENT-REQUIRED` header and charges nothing; an x402 client pays and repeats the same request with a `PAYME',
        ),
      ),
    ),
    usdcCheckoutId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "usdc"`: the `checkoutId` from an earlier `PAYMENT_REQUIRED`, once its `x402Url` or `payUrl` has been paid. Send it with otherwise the same request; the purchase completes if the checkout is paid and was opened for this purchase.',
        ),
      ),
    ),
    cardPaymentId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "card"`: the `cardPaymentId` from an earlier `PAYMENT_REQUIRED`, once its `payUrl` has been paid (the card is then held). Send it with otherwise the same request; the hold is captured if the purchase succeeds and released if not.',
        ),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate + preview without provisioning or charging."))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.union([
    a.looseObject({
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
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type HostingCreateInput = PorkbunEndpointInput<typeof hostingCreateEndpoint>
export type HostingCreateResponse = PorkbunEndpointOutput<typeof hostingCreateEndpoint>
