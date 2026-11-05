import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioProfileUpdateEndpoint = porkbunEndpointDefine({
  op: "linkInBioProfileUpdate",
  method: "POST",
  path: "/linkinbio/updateProfile/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update the page title, bio and avatar",
  inputSchema: a.object({
    // Supported by the operation prose, though absent from requestBody properties.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without saving changes"))),
    domain: a.pipe(a.string(), a.description("domain")),
    title: a.optional(a.pipe(a.string(), a.description("Up to 100 characters."))),
    bio: a.optional(a.pipe(a.string(), a.description("Up to 500 characters."))),
    avatar: a.optional(a.pipe(a.nullable(a.string()), a.description("Base64 JPEG or PNG, or null to remove."))),
  }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioProfileUpdateInput = PorkbunEndpointInput<typeof linkInBioProfileUpdateEndpoint>
export type LinkInBioProfileUpdateResponse = PorkbunEndpointOutput<typeof linkInBioProfileUpdateEndpoint>
