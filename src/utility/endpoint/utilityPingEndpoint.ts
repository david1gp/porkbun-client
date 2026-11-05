import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunIpResponseSchema } from "../../shared/schema/porkbunIpResponseSchema.js"

export const utilityPingEndpoint = porkbunEndpointDefine({
  op: "utilityPing",
  method: "POST",
  path: "/ping",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Test credentials and get caller IP",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    ...porkbunIpResponseSchema.entries,
    credentialsValid: a.optional(a.boolean()),
    account: a.optional(a.string()),
    scopes: a.optional(a.array(a.string())),
  }),
})
export type UtilityPingInput = PorkbunEndpointInput<typeof utilityPingEndpoint>
export type UtilityPingResponse = PorkbunEndpointOutput<typeof utilityPingEndpoint>
