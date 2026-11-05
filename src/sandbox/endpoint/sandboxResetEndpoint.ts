import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const sandboxResetEndpoint = porkbunEndpointDefine({
  op: "sandboxReset",
  method: "POST",
  path: "/sandbox/reset",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Sandbox: reset to a clean slate",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    domainsCleared: a.optional(a.pipe(a.number(), a.integer())),
    balance: a.optional(a.pipe(a.number(), a.integer())),
    sandbox: a.optional(a.boolean()),
  }),
})
export type SandboxResetInput = PorkbunEndpointInput<typeof sandboxResetEndpoint>
export type SandboxResetResponse = PorkbunEndpointOutput<typeof sandboxResetEndpoint>
