import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const transferStartEndpoint = porkbunEndpointDefine({
  op: "transferStart",
  method: "POST",
  path: "/domain/startTransfer/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Release a held transfer to the registry",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("Domain name.")),
    force: a.optional(
      a.pipe(
        a.boolean(),
        a.description("Release even though the zone is empty. Use only when the domain needs no DNS here."),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type TransferStartInput = PorkbunEndpointInput<typeof transferStartEndpoint>
export type TransferStartResponse = PorkbunEndpointOutput<typeof transferStartEndpoint>
