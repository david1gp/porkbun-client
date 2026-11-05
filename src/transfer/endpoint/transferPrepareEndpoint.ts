import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
import { porkbunDryRunPreviewSchema } from "../../shared/schema/porkbunDryRunPreviewSchema.js"
export const transferPrepareEndpoint = porkbunEndpointDefine({
  op: "transferPrepare",
  method: "POST",
  path: "/domain/prepareTransfer/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Create the DNS zone for a held transfer",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("Domain name.")),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Preview without changing state"))),
  }),
  responseSchema: a.union([
    a.looseObject({
      status: a.optional(a.string()),
      domain: a.optional(a.string()),
      zoneReady: a.optional(a.boolean()),
      recordCount: a.optional(a.pipe(a.number(), a.integer())),
      message: a.optional(a.string()),
      porkbunNameservers: a.optional(a.array(a.string())),
    }),
    porkbunDryRunPreviewSchema,
  ]),
})
export type TransferPrepareInput = PorkbunEndpointInput<typeof transferPrepareEndpoint>
export type TransferPrepareResponse = PorkbunEndpointOutput<typeof transferPrepareEndpoint>
