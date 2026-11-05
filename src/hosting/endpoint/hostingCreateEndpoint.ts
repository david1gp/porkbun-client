import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { hostingCreateResponseSchema } from "../schema/hostingCreateResponseSchema.js"
export const hostingCreateEndpoint = porkbunEndpointDefine({
  op: "hostingCreate",
  method: "POST",
  path: "/hosting/create/{domain}",
  auth: "required",
  scope: "purchase",
  agent: { safe: false, cost: true, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Provision static, WordPress or Link in Bio hosting",
  inputSchema: a.object({
    sku: a.pipe(
      // The request enum is stale: the operation description also provisions
      // CLOUDWORDPRESS… and explicitly lists both paid Link in Bio SKUs.
      a.union([
        a.picklist(["PIXIESECURESTATICM2", "PIXIESECURESTATICY2", "PIXIELINKSM1", "PIXIELINKSY1"]),
        a.custom<`CLOUDWORDPRESS${string}`>(
          (sku) => typeof sku === "string" && /^CLOUDWORDPRESS[A-Z0-9]+$/.test(sku),
          "Use a provisionable WordPress SKU from hosting plan-list",
        ),
      ]),
      a.description(
        "The hosting plan SKU to provision. Discover the provisionable SKUs (and each one’s price/interval/trial) via GET /hosting/plans, then pass the row’s `sku`. Static: PIXIESECURESTATICM2 / PIXIESECURESTATICY2; WordPress: CLOUDWORDPRESS…; Link in Bio: PIXIELINKSM1 / PIXIELINKSY1. Use the selected plan price as acknowledgedCost.",
      ),
    ),
    acknowledgedCost: a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description(
        "Echo the selected plan price in cents from hosting plan-list to acknowledge the auto-renew / charge. Mismatch returns COST_ACKNOWLEDGMENT_REQUIRED.",
      ),
    ),
    agreeToTerms: a.pipe(
      a.picklist(["yes"]),
      a.description("Must be yes to accept the hosting terms and auto-renewal"),
    ),
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
          'Pay from account credit by default. "usdc" starts an x402 checkout; "card" starts a card authorization. Complete the HTTP 402 payment flow and retry the same request with the payment identifier.',
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
  responseSchema: hostingCreateResponseSchema,
})
export type HostingCreateInput = PorkbunEndpointInput<typeof hostingCreateEndpoint>
export type HostingCreateResponse = PorkbunEndpointOutput<typeof hostingCreateEndpoint>
