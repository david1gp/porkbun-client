import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunBasicResponseSchema } from "../../shared/schema/porkbunBasicResponseSchema.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const glueDeleteEndpoint = porkbunEndpointDefine({
  op: "glueDelete",
  method: "POST",
  path: "/domain/deleteGlue/{domain}/{subdomain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Delete glue record",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("domain")),
    subdomain: a.pipe(a.string(), a.description("subdomain")),
  }),
  responseSchema: porkbunBasicResponseSchema,
})
export type GlueDeleteInput = PorkbunEndpointInput<typeof glueDeleteEndpoint>
export type GlueDeleteResponse = PorkbunEndpointOutput<typeof glueDeleteEndpoint>
