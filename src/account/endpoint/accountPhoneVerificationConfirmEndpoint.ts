import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountPhoneVerificationConfirmEndpoint = porkbunEndpointDefine({
  op: "accountPhoneVerificationConfirm",
  method: "POST",
  path: "/account/verifyPhone/confirm",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Confirm the phone verification code",
  inputSchema: a.object({
    code: a.pipe(a.string(), a.description("The code the person received, exactly as texted. Case does not matter.")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    verified: a.optional(a.boolean()),
    alreadyVerified: a.optional(a.boolean()),
    emailVerified: a.optional(a.boolean()),
    message: a.optional(a.string()),
  }),
})
export type AccountPhoneVerificationConfirmInput = PorkbunEndpointInput<typeof accountPhoneVerificationConfirmEndpoint>
export type AccountPhoneVerificationConfirmResponse = PorkbunEndpointOutput<
  typeof accountPhoneVerificationConfirmEndpoint
>
