import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioSocialsUpdateEndpoint = porkbunEndpointDefine({
  op: "linkInBioSocialsUpdate",
  method: "POST",
  path: "/linkinbio/updateSocials/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update social icons",
  inputSchema: a.object({
    // Supported by the operation prose, though absent from requestBody properties.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without saving changes"))),
    domain: a.pipe(a.string(), a.description("domain")),
    location: a.optional(a.pipe(a.picklist(["top", "bottom"]), a.description("location"))),
    socials: a.optional(a.pipe(a.record(a.string(), a.nullable(a.string())), a.description("socials"))),
  }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioSocialsUpdateInput = PorkbunEndpointInput<typeof linkInBioSocialsUpdateEndpoint>
export type LinkInBioSocialsUpdateResponse = PorkbunEndpointOutput<typeof linkInBioSocialsUpdateEndpoint>
