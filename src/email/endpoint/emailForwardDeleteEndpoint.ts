import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const emailForwardDeleteEndpoint = porkbunEndpointDefine({
  op: "emailForwardDelete",
  method: "POST",
  path: "/email/deleteForward/{domain}",
  auth: "required",
  scope: "email",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: false },
  brief: "Delete an email forward",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    address: a.pipe(a.string(), a.description("address")),
    forwardTo: a.pipe(a.string(), a.description("forwardTo")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    address: a.optional(a.string()),
    forwardTo: a.optional(a.string()),
    dnsRecordsRemoved: a.optional(a.boolean()),
  }),
})
export type EmailForwardDeleteInput = PorkbunEndpointInput<typeof emailForwardDeleteEndpoint>
export type EmailForwardDeleteResponse = PorkbunEndpointOutput<typeof emailForwardDeleteEndpoint>
