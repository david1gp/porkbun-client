import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioLinkInputSchema } from "../schema/linkInBioLinkInputSchema.js"
import { linkInBioLinkResponseSchema } from "../schema/linkInBioLinkResponseSchema.js"

export const linkInBioLinkEditEndpoint = porkbunEndpointDefine({
  op: "linkInBioLinkEdit",
  method: "POST",
  path: "/linkinbio/editLink/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Edit a link",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    ...a.partial(linkInBioLinkInputSchema).entries,
    id: a.pipe(a.pipe(a.number(), a.integer()), a.description("From `get`.")),
  }),
  responseSchema: linkInBioLinkResponseSchema,
})
export type LinkInBioLinkEditInput = PorkbunEndpointInput<typeof linkInBioLinkEditEndpoint>
export type LinkInBioLinkEditResponse = PorkbunEndpointOutput<typeof linkInBioLinkEditEndpoint>
