import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingPlanListEndpoint = porkbunEndpointDefine({
  op: "hostingPlanList",
  method: "GET",
  path: "/hosting/plans",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List provisionable hosting plans (static + WordPress)",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    plans: a.optional(
      a.array(
        a.looseObject({
          product: a.optional(a.string()),
          plan: a.optional(a.string()),
          sku: a.optional(a.string()),
          interval: a.optional(a.string()),
          price: a.optional(a.pipe(a.number(), a.integer())),
          priceFormatted: a.optional(a.string()),
          trialDays: a.optional(a.pipe(a.number(), a.integer())),
          name: a.optional(a.string()),
          features: a.optional(a.record(a.string(), a.unknown())),
        }),
      ),
    ),
  }),
})
export type HostingPlanListInput = PorkbunEndpointInput<typeof hostingPlanListEndpoint>
export type HostingPlanListResponse = PorkbunEndpointOutput<typeof hostingPlanListEndpoint>
