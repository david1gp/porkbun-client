import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountBalanceGetEndpoint = porkbunEndpointDefine({
  op: "accountBalanceGet",
  method: "GET",
  path: "/account/balance",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get account balance",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.picklist(["SUCCESS", "ERROR"])),
    balance: a.optional(a.pipe(a.number(), a.integer())),
    display: a.optional(a.string()),
  }),
})
export type AccountBalanceGetInput = PorkbunEndpointInput<typeof accountBalanceGetEndpoint>
export type AccountBalanceGetResponse = PorkbunEndpointOutput<typeof accountBalanceGetEndpoint>
