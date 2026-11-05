import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioLinkReorderEndpoint = porkbunEndpointDefine({
  op: "linkInBioLinkReorder",
  method: "POST",
  path: "/linkinbio/reorderLinks/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Reorder links",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    ids: a.pipe(a.array(a.pipe(a.number(), a.integer())), a.description("Every link id, in display order.")),
  }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioLinkReorderInput = PorkbunEndpointInput<typeof linkInBioLinkReorderEndpoint>
export type LinkInBioLinkReorderResponse = PorkbunEndpointOutput<typeof linkInBioLinkReorderEndpoint>
