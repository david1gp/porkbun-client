import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
import { porkbunStatusSchema } from "../../shared/schema/porkbunStatusSchema.js"
import { transferItemSchema } from "../schema/transferItemSchema.js"
export const transferGetEndpoint = porkbunEndpointDefine({
  op: "transferGet",
  method: "GET",
  path: "/domain/getTransfer/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get transfer status",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("The domain name (e.g. `example.com`).")),
  }),
  responseSchema: a.looseObject({ status: a.optional(porkbunStatusSchema), transfer: a.optional(transferItemSchema) }),
})
export type TransferGetInput = PorkbunEndpointInput<typeof transferGetEndpoint>
export type TransferGetResponse = PorkbunEndpointOutput<typeof transferGetEndpoint>
