import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountInviteStatusGetEndpoint = porkbunEndpointDefine({
  op: "accountInviteStatusGet",
  method: "GET",
  path: "/account/inviteStatus",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Check account invite status",
  inputSchema: a.object({
    token: a.pipe(a.string(), a.description("The `inviteToken` returned by `/account/invite`")),
  }),
  responseSchema: a.looseObject({
    status: a.string(),
    inviteStatus: a.picklist(["PENDING", "ACCEPTED", "EXPIRED"]),
    newAccountId: a.optional(a.pipe(a.number(), a.integer())),
  }),
})
export type AccountInviteStatusGetInput = PorkbunEndpointInput<typeof accountInviteStatusGetEndpoint>
export type AccountInviteStatusGetResponse = PorkbunEndpointOutput<typeof accountInviteStatusGetEndpoint>
