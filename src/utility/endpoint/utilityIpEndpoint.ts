import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunIpResponseSchema } from "../../shared/schema/porkbunIpResponseSchema.js"

export const utilityIpEndpoint = porkbunEndpointDefine({
  op: "utilityIp",
  method: "GET",
  path: "/ip",
  auth: "none",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get caller IP address",
  inputSchema: a.object({}),
  responseSchema: porkbunIpResponseSchema,
})
export type UtilityIpInput = PorkbunEndpointInput<typeof utilityIpEndpoint>
export type UtilityIpResponse = PorkbunEndpointOutput<typeof utilityIpEndpoint>
