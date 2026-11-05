import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountEmailVerificationSendEndpoint = porkbunEndpointDefine({
  op: "accountEmailVerificationSend",
  method: "POST",
  path: "/account/verifyEmail/send",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Email a verification code to the account's address",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    sent: a.optional(a.boolean()),
    codeAlreadySent: a.optional(a.boolean()),
    alreadyVerified: a.optional(a.boolean()),
    sentTo: a.optional(a.string()),
    expiresInMinutes: a.optional(a.pipe(a.number(), a.integer())),
    retryAfterSeconds: a.optional(a.pipe(a.number(), a.integer())),
    message: a.optional(a.string()),
    phoneVerified: a.optional(a.boolean()),
  }),
})
export type AccountEmailVerificationSendInput = PorkbunEndpointInput<typeof accountEmailVerificationSendEndpoint>
export type AccountEmailVerificationSendResponse = PorkbunEndpointOutput<typeof accountEmailVerificationSendEndpoint>
