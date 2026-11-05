import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioCreateEndpoint = porkbunEndpointDefine({
  op: "linkInBioCreate",
  method: "POST",
  path: "/linkinbio/create/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Turn on a free Link in Bio page",
  inputSchema: a.object({
    // Supported by the operation prose, though absent from requestBody properties.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without saving changes"))),
    domain: a.pipe(a.string(), a.description("domain")),
    agreeToNameserverChange: a.optional(
      a.pipe(a.boolean(), a.description("Required when the domain is not on Porkbun nameservers.")),
    ),
  }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioCreateInput = PorkbunEndpointInput<typeof linkInBioCreateEndpoint>
export type LinkInBioCreateResponse = PorkbunEndpointOutput<typeof linkInBioCreateEndpoint>
