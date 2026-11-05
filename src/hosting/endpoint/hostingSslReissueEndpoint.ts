import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingSslReissueEndpoint = porkbunEndpointDefine({
  op: "hostingSslReissue",
  method: "POST",
  path: "/hosting/reissueSsl/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Restart SSL issuance",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingSslReissueInput = PorkbunEndpointInput<typeof hostingSslReissueEndpoint>
export type HostingSslReissueResponse = PorkbunEndpointOutput<typeof hostingSslReissueEndpoint>
