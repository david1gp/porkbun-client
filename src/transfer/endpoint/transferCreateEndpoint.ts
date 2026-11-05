import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunCentsSchema } from "../../shared/schema/porkbunCentsSchema.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"
import { porkbunLimitsSchema } from "../../shared/schema/porkbunLimitsSchema.js"
export const transferCreateEndpoint = porkbunEndpointDefine({
  op: "transferCreate",
  method: "POST",
  path: "/domain/transfer/{domain}",
  auth: "required",
  scope: "purchase",
  agent: { safe: false, cost: true, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Initiate a domain transfer",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("The domain name to transfer (e.g. `example.com`).")),
    authCode: a.pipe(a.string(), a.description("The EPP auth code for the domain.")),
    cost: a.pipe(
      porkbunCentsSchema,
      a.description("The transfer cost in cents as returned by the pricing API. Must match exactly."),
    ),
    holdForDnsSetup: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "Charge the transfer but hold it at `PENDINGDNS` instead of releasing it to the registry, so the DNS zone can be built before the domain moves. This is the no-downtime path: hold, t",
        ),
      ),
    ),
    payWith: a.optional(
      a.pipe(
        a.picklist(["usdc", "card"]),
        a.description(
          'Optional. `"usdc"` pays for this purchase directly in USDC on Base over x402 instead of from account credit. The first call answers HTTP 402 (`PAYMENT_REQUIRED`) with Coinbase\'s te',
        ),
      ),
    ),
    usdcCheckoutId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "usdc"`: the `checkoutId` from an earlier `PAYMENT_REQUIRED`, once its `x402Url` or `payUrl` has been paid. Send it with otherwise the same request; the purchase com',
        ),
      ),
    ),
    cardPaymentId: a.optional(
      a.pipe(
        a.string(),
        a.description(
          'With `payWith: "card"`: the `cardPaymentId` from an earlier `PAYMENT_REQUIRED`, once its `payUrl` has been paid (the card is then held). Send it with otherwise the same request; th',
        ),
      ),
    ),
    dryRun: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "Optional. When true, runs all pre-flight validation and returns a preview with `dryRun: true` and `wouldSucceed` WITHOUT initiating the transfer or charging. Nothing changes and th",
        ),
      ),
    ),
  }),
  responseSchema: a.union([
    porkbunDryRunPreviewSchema,
    a.looseObject({
      status: a.optional(a.picklist(["SUCCESS", "ERROR"])),
      domain: a.optional(a.string()),
      orderId: a.optional(a.pipe(a.number(), a.integer())),
      transferId: a.optional(a.pipe(a.number(), a.integer())),
      message: a.optional(a.string()),
      balance: a.optional(a.pipe(a.number(), a.integer())),
      ttlRemaining: a.optional(a.pipe(a.number(), a.integer())),
      limits: a.optional(porkbunLimitsSchema),
      requestId: a.optional(a.string()),
    }),
  ]),
})
export type TransferCreateInput = PorkbunEndpointInput<typeof transferCreateEndpoint>
export type TransferCreateResponse = PorkbunEndpointOutput<typeof transferCreateEndpoint>
