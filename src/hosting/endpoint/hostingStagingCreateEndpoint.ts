import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { wordPressStagingSchema } from "../schema/wordPressStagingSchema.js"
export const hostingStagingCreateEndpoint = porkbunEndpointDefine({
  op: "hostingStagingCreate",
  method: "POST",
  path: "/hosting/createStaging/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Create a staging site",
  inputSchema: a.object({
    fsId: a.optional(
      a.pipe(a.string(), a.description("Optional: build from this files backup of the live site (with dbId).")),
    ),
    dbId: a.optional(a.pipe(a.string(), a.description("Optional: the database backup to go with fsId."))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    staging: a.optional(wordPressStagingSchema),
    message: a.optional(a.string()),
  }),
})
export type HostingStagingCreateInput = PorkbunEndpointInput<typeof hostingStagingCreateEndpoint>
export type HostingStagingCreateResponse = PorkbunEndpointOutput<typeof hostingStagingCreateEndpoint>
