import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"

export const accountPhoneVerificationSendEndpoint = porkbunEndpointDefine({
  op: "accountPhoneVerificationSend",
  method: "POST",
  path: "/account/verifyPhone/send",
  auth: "required",
  scope: "account",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Text a verification code to the account's phone",
  inputSchema: a.object({
    channel: a.optional(
      a.pipe(
        a.picklist(["sms", "call"]),
        a.description("`call` reads the code out by voice, for when a text does not arrive."),
      ),
    ),
    dryRun: a.optional(a.boolean()),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.optional(a.string()),
      sent: a.optional(a.boolean()),
      codeAlreadySent: a.optional(a.boolean()),
      alreadyVerified: a.optional(a.boolean()),
      channel: a.optional(a.string()),
      sentTo: a.optional(a.string()),
      expiresInMinutes: a.optional(a.pipe(a.number(), a.integer())),
      retryAfterSeconds: a.optional(a.pipe(a.number(), a.integer())),
      message: a.optional(a.string()),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type AccountPhoneVerificationSendInput = PorkbunEndpointInput<typeof accountPhoneVerificationSendEndpoint>
export type AccountPhoneVerificationSendResponse = PorkbunEndpointOutput<typeof accountPhoneVerificationSendEndpoint>
