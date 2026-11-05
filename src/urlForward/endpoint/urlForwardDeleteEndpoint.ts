import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunBasicResponseSchema } from "../../shared/schema/porkbunBasicResponseSchema.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const urlForwardDeleteEndpoint = porkbunEndpointDefine({
  op: "urlForwardDelete",
  method: "POST",
  path: "/domain/deleteUrlForward/{domain}/{id}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Delete URL forward",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("domain")),
    id: a.pipe(a.string(), a.description("URL forward record ID")),
  }),
  responseSchema: porkbunBasicResponseSchema,
})
export type UrlForwardDeleteInput = PorkbunEndpointInput<typeof urlForwardDeleteEndpoint>
export type UrlForwardDeleteResponse = PorkbunEndpointOutput<typeof urlForwardDeleteEndpoint>
