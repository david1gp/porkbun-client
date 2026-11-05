import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountTopupCryptoStatusGetEndpoint = porkbunEndpointDefine({
  op: "accountTopupCryptoStatusGet",
  method: "GET",
  path: "/account/topupCryptoStatus/{checkoutId}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Status of a USDC top-up",
  inputSchema: a.object({ checkoutId: a.string() }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    checkoutId: a.optional(a.string()),
    state: a.optional(a.picklist(["ACTIVE", "PROCESSING", "COMPLETED", "EXPIRED", "FAILED", "DEACTIVATED"])),
    credited: a.optional(a.boolean()),
    balance_cents: a.optional(a.pipe(a.number(), a.integer())),
    balance: a.optional(a.string()),
  }),
})
export type AccountTopupCryptoStatusGetInput = PorkbunEndpointInput<typeof accountTopupCryptoStatusGetEndpoint>
export type AccountTopupCryptoStatusGetResponse = PorkbunEndpointOutput<typeof accountTopupCryptoStatusGetEndpoint>
