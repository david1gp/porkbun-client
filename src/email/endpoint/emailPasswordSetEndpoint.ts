import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const emailPasswordSetEndpoint = porkbunEndpointDefine({
  op: "emailPasswordSet",
  method: "POST",
  path: "/email/setPassword",
  auth: "required",
  scope: "email",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Set email hosting password",
  inputSchema: a.object({
    emailAddress: a.pipe(a.string(), a.description("The full email address (e.g. user@example.com)")),
    password: a.pipe(a.string(), a.description("The new password. Must pass Porkbun password validation rules.")),
  }),
  responseSchema: a.looseObject({
    warnings: a.optional(a.array(a.string())),
    status: a.picklist(["SUCCESS", "ERROR"]),
    message: a.optional(a.string()),
    code: a.optional(a.string()),
  }),
})
export type EmailPasswordSetInput = PorkbunEndpointInput<typeof emailPasswordSetEndpoint>
export type EmailPasswordSetResponse = PorkbunEndpointOutput<typeof emailPasswordSetEndpoint>
