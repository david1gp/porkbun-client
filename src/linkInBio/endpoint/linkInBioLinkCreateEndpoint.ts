import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioLinkInputSchema } from "../schema/linkInBioLinkInputSchema.js"
import { linkInBioLinkResponseSchema } from "../schema/linkInBioLinkResponseSchema.js"

export const linkInBioLinkCreateEndpoint = porkbunEndpointDefine({
  op: "linkInBioLinkCreate",
  method: "POST",
  path: "/linkinbio/addLink/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Add a link",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    ...linkInBioLinkInputSchema.entries,
    position: a.optional(a.pipe(a.picklist(["bottom", "top"]), a.description("position"))),
  }),
  responseSchema: linkInBioLinkResponseSchema,
})
export type LinkInBioLinkCreateInput = PorkbunEndpointInput<typeof linkInBioLinkCreateEndpoint>
export type LinkInBioLinkCreateResponse = PorkbunEndpointOutput<typeof linkInBioLinkCreateEndpoint>
