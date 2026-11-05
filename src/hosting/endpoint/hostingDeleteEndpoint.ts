import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingDeleteEndpoint = porkbunEndpointDefine({
  op: "hostingDelete",
  method: "POST",
  path: "/hosting/delete/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Deprovision hosting (either product)",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    warnings: a.optional(a.array(a.string())),
    status: a.picklist(["SUCCESS", "ERROR"]),
    message: a.optional(a.string()),
    code: a.optional(a.string()),
  }),
})
export type HostingDeleteInput = PorkbunEndpointInput<typeof hostingDeleteEndpoint>
export type HostingDeleteResponse = PorkbunEndpointOutput<typeof hostingDeleteEndpoint>
