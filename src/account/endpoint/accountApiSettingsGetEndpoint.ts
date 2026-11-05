import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountApiSettingsGetEndpoint = porkbunEndpointDefine({
  op: "accountApiSettingsGet",
  method: "GET",
  path: "/account/apiSettings",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get API spend settings",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.picklist(["SUCCESS", "ERROR"])),
    settings: a.optional(
      a.looseObject({
        monthlySpendLimit: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        lowBalanceAlert: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        autoTopup: a.optional(a.boolean()),
        topupThreshold: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        topupAmount: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
      }),
    ),
    monthlySpend: a.optional(a.pipe(a.number(), a.integer())),
    spendLimit: a.optional(
      a.looseObject({
        limit: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        source: a.optional(a.picklist(["account", "default", "none"])),
        spent: a.optional(a.pipe(a.number(), a.integer())),
        remaining: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
      }),
    ),
    topupLimit: a.optional(
      a.looseObject({
        limit: a.optional(a.pipe(a.number(), a.integer())),
        source: a.optional(a.picklist(["account", "default"])),
        added: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
      }),
    ),
  }),
})
export type AccountApiSettingsGetInput = PorkbunEndpointInput<typeof accountApiSettingsGetEndpoint>
export type AccountApiSettingsGetResponse = PorkbunEndpointOutput<typeof accountApiSettingsGetEndpoint>
