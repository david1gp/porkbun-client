import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountEmailVerificationConfirmEndpoint = porkbunEndpointDefine({
  op: "accountEmailVerificationConfirm",
  method: "POST",
  path: "/account/verifyEmail/confirm",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Confirm the email verification code",
  inputSchema: a.object({
    code: a.pipe(a.string(), a.description("The verification code from the email, exactly as written.")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    verified: a.optional(a.boolean()),
    alreadyVerified: a.optional(a.boolean()),
    message: a.optional(a.string()),
    phoneVerified: a.optional(a.boolean()),
  }),
})
export type AccountEmailVerificationConfirmInput = PorkbunEndpointInput<typeof accountEmailVerificationConfirmEndpoint>
export type AccountEmailVerificationConfirmResponse = PorkbunEndpointOutput<
  typeof accountEmailVerificationConfirmEndpoint
>
