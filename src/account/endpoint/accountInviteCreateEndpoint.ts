import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountInviteCreateEndpoint = porkbunEndpointDefine({
  op: "accountInviteCreate",
  method: "POST",
  path: "/account/invite",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Create an account registration invite",
  inputSchema: a.object({
    email: a.optional(
      a.pipe(a.string(), a.description("Email address to pre-fill on the registration form (optional)")),
    ),
    returnUrl: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "HTTPS URL to redirect the user to after successful registration (optional). Use this to send users back to your platform after they complete account creation.",
        ),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.string(),
    inviteToken: a.string(),
    inviteUrl: a.string(),
    expires: a.string(),
  }),
})
export type AccountInviteCreateInput = PorkbunEndpointInput<typeof accountInviteCreateEndpoint>
export type AccountInviteCreateResponse = PorkbunEndpointOutput<typeof accountInviteCreateEndpoint>
