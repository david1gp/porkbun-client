import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const emailForwardListEndpoint = porkbunEndpointDefine({
  op: "emailForwardList",
  method: "POST",
  path: "/email/getForwards/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List email forwards",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    forwards: a.optional(
      a.array(
        a.looseObject({
          address: a.optional(a.string()),
          forwardTo: a.optional(a.string()),
          created: a.optional(a.string()),
        }),
      ),
    ),
    limits: a.optional(
      a.looseObject({
        used: a.optional(a.pipe(a.number(), a.integer())),
        max: a.optional(a.pipe(a.number(), a.integer())),
      }),
    ),
    dnsConfigured: a.optional(a.boolean()),
  }),
})
export type EmailForwardListInput = PorkbunEndpointInput<typeof emailForwardListEndpoint>
export type EmailForwardListResponse = PorkbunEndpointOutput<typeof emailForwardListEndpoint>
