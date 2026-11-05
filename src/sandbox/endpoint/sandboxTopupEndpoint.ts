import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const sandboxTopupEndpoint = porkbunEndpointDefine({
  op: "sandboxTopup",
  method: "POST",
  path: "/sandbox/topup",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Sandbox: add fake credit",
  inputSchema: a.object({
    amount: a.optional(
      a.pipe(a.number(), a.integer(), a.description("Fake credit to add in US cents (default 100000; max 1000000)")),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    granted: a.optional(a.pipe(a.number(), a.integer())),
    balance: a.optional(a.pipe(a.number(), a.integer())),
    display: a.optional(a.string()),
    sandbox: a.optional(a.boolean()),
  }),
})
export type SandboxTopupInput = PorkbunEndpointInput<typeof sandboxTopupEndpoint>
export type SandboxTopupResponse = PorkbunEndpointOutput<typeof sandboxTopupEndpoint>
