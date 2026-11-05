import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"

export const accountTopupMppEndpoint = porkbunEndpointDefine({
  op: "accountTopupMpp",
  method: "POST",
  path: "/account/topupMpp",
  auth: "required",
  scope: "funding",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Top up credit with the user's card, paid by an agent (MPP)",
  inputSchema: a.object({
    amount: a.pipe(
      a.pipe(a.number(), a.integer(), a.minValue(500), a.maxValue(50000)),
      a.description("Credit to add, in integer US cents."),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Check eligibility and limits only."))),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.optional(a.string()),
      amount_cents: a.optional(a.pipe(a.number(), a.integer())),
      payUrl: a.optional(a.string()),
      expiresAt: a.optional(a.string()),
      protocol: a.optional(a.string()),
      methods: a.optional(a.array(a.string())),
      message: a.optional(a.string()),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type AccountTopupMppInput = PorkbunEndpointInput<typeof accountTopupMppEndpoint>
export type AccountTopupMppResponse = PorkbunEndpointOutput<typeof accountTopupMppEndpoint>
