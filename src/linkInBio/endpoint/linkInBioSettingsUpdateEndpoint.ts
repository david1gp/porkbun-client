import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioSettingsUpdateEndpoint = porkbunEndpointDefine({
  op: "linkInBioSettingsUpdate",
  method: "POST",
  path: "/linkinbio/updateSettings/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update page settings",
  inputSchema: a.object({
    // Supported by the operation prose, though absent from requestBody properties.
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without saving changes"))),
    domain: a.pipe(a.string(), a.description("domain")),
    sensitiveContent: a.optional(
      a.pipe(a.nullable(a.picklist(["generic", "18", "21", "25"])), a.description("sensitiveContent")),
    ),
    analytics: a.optional(a.pipe(a.record(a.string(), a.string()), a.description("analytics"))),
  }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioSettingsUpdateInput = PorkbunEndpointInput<typeof linkInBioSettingsUpdateEndpoint>
export type LinkInBioSettingsUpdateResponse = PorkbunEndpointOutput<typeof linkInBioSettingsUpdateEndpoint>
