import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioGetEndpoint = porkbunEndpointDefine({
  op: "linkInBioGet",
  method: "POST",
  path: "/linkinbio/get/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get a Link in Bio page",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioGetInput = PorkbunEndpointInput<typeof linkInBioGetEndpoint>
export type LinkInBioGetResponse = PorkbunEndpointOutput<typeof linkInBioGetEndpoint>
