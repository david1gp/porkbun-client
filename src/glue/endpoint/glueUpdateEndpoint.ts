import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunBasicResponseSchema } from "../../shared/schema/porkbunBasicResponseSchema.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const glueUpdateEndpoint = porkbunEndpointDefine({
  op: "glueUpdate",
  method: "POST",
  path: "/domain/updateGlue/{domain}/{subdomain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update glue record",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("domain")),
    subdomain: a.pipe(a.string(), a.description("subdomain")),
    ips: a.pipe(
      a.array(a.string()),
      a.description("Array of IP addresses (IPv4 and/or IPv6) to associate with the host record"),
    ),
  }),
  responseSchema: porkbunBasicResponseSchema,
})
export type GlueUpdateInput = PorkbunEndpointInput<typeof glueUpdateEndpoint>
export type GlueUpdateResponse = PorkbunEndpointOutput<typeof glueUpdateEndpoint>
