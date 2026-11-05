import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioLinkDeleteEndpoint = porkbunEndpointDefine({
  op: "linkInBioLinkDelete",
  method: "POST",
  path: "/linkinbio/deleteLink/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Delete a link",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    id: a.pipe(a.pipe(a.number(), a.integer()), a.description("From `get`.")),
  }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioLinkDeleteInput = PorkbunEndpointInput<typeof linkInBioLinkDeleteEndpoint>
export type LinkInBioLinkDeleteResponse = PorkbunEndpointOutput<typeof linkInBioLinkDeleteEndpoint>
