import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"
export const transferCancelEndpoint = porkbunEndpointDefine({
  op: "transferCancel",
  method: "POST",
  path: "/domain/cancelTransfer/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Cancel an inbound transfer and refund it",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("Domain name.")),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Preview without changing state"))),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.optional(a.string()),
      domain: a.optional(a.string()),
      cancelled: a.optional(a.boolean()),
      previousStatus: a.optional(a.string()),
      transferStatus: a.optional(a.string()),
      withdrawnAtRegistry: a.optional(a.boolean()),
      registryResultCode: a.optional(a.string()),
      registryCode: a.optional(a.string()),
      refunded: a.optional(a.boolean()),
      refundAmount: a.optional(a.pipe(a.number(), a.integer())),
      orderId: a.optional(a.pipe(a.number(), a.integer())),
      message: a.optional(a.string()),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type TransferCancelInput = PorkbunEndpointInput<typeof transferCancelEndpoint>
export type TransferCancelResponse = PorkbunEndpointOutput<typeof transferCancelEndpoint>
