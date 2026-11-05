import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const transferAuthCodeUpdateEndpoint = porkbunEndpointDefine({
  op: "transferAuthCodeUpdate",
  method: "POST",
  path: "/domain/updateTransferAuthCode/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Replace the auth code on a stuck transfer",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("Domain name.")),
    authCode: a.pipe(
      a.string(),
      a.description(
        "The replacement authorization code, exactly as the losing registrar issued it. Never interpolate this into a shell command.",
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    authCodeValid: a.optional(a.boolean()),
    previousStatus: a.optional(a.string()),
    transferStatus: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type TransferAuthCodeUpdateInput = PorkbunEndpointInput<typeof transferAuthCodeUpdateEndpoint>
export type TransferAuthCodeUpdateResponse = PorkbunEndpointOutput<typeof transferAuthCodeUpdateEndpoint>
