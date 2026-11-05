import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { wordPressStagingSchema } from "../schema/wordPressStagingSchema.js"
export const hostingStagingGetEndpoint = porkbunEndpointDefine({
  op: "hostingStagingGet",
  method: "POST",
  path: "/hosting/getStaging/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get the staging site",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    staging: a.optional(wordPressStagingSchema),
  }),
})
export type HostingStagingGetInput = PorkbunEndpointInput<typeof hostingStagingGetEndpoint>
export type HostingStagingGetResponse = PorkbunEndpointOutput<typeof hostingStagingGetEndpoint>
