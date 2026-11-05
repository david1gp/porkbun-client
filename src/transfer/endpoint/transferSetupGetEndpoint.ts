import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const transferSetupGetEndpoint = porkbunEndpointDefine({
  op: "transferSetupGet",
  method: "GET",
  path: "/domain/getTransferSetup/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "State of an in-flight inbound transfer",
  inputSchema: a.object({ domain: a.pipe(porkbunDomainSchema, a.description("Domain name.")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    transfer: a.optional(a.record(a.string(), a.unknown())),
    held: a.optional(a.pipe(a.number(), a.integer())),
    zoneReady: a.optional(a.pipe(a.number(), a.integer())),
    recordCount: a.optional(a.pipe(a.number(), a.integer())),
    delegation: a.optional(a.record(a.string(), a.unknown())),
    dnssec: a.optional(a.pipe(a.number(), a.integer())),
    nextStep: a.optional(a.record(a.string(), a.unknown())),
    porkbunNameservers: a.optional(a.array(a.string())),
  }),
})
export type TransferSetupGetInput = PorkbunEndpointInput<typeof transferSetupGetEndpoint>
export type TransferSetupGetResponse = PorkbunEndpointOutput<typeof transferSetupGetEndpoint>
