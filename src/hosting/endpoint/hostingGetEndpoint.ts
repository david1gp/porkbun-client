import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { wordPressSiteSchema } from "../schema/wordPressSiteSchema.js"
export const hostingGetEndpoint = porkbunEndpointDefine({
  op: "hostingGet",
  method: "GET",
  path: "/hosting/get/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get hosting status (either product)",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    hosting: a.optional(
      a.nullable(
        a.looseObject({
          domain: a.optional(a.string()),
          product: a.optional(a.string()),
          status: a.optional(a.string()),
          plan: a.optional(a.string()),
          server: a.optional(a.string()),
          isTrial: a.optional(a.boolean()),
          autoRenew: a.optional(a.boolean()),
          expireDate: a.optional(a.string()),
          pendingRetire: a.optional(a.boolean()),
          cost: a.optional(a.record(a.string(), a.unknown())),
          wordpress: a.optional(
            a.looseObject({
              restUrl: a.optional(a.string()),
              adminUrl: a.optional(a.string()),
              site: a.optional(wordPressSiteSchema),
            }),
          ),
        }),
      ),
    ),
  }),
})
export type HostingGetInput = PorkbunEndpointInput<typeof hostingGetEndpoint>
export type HostingGetResponse = PorkbunEndpointOutput<typeof hostingGetEndpoint>
