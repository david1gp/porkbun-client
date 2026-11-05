import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingWordPressVersionSetEndpoint = porkbunEndpointDefine({
  op: "hostingWordPressVersionSet",
  method: "POST",
  path: "/hosting/setWordPressVersion/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Set the WordPress version",
  inputSchema: a.object({
    version: a.pipe(a.picklist(["latest", "previous"]), a.description("version")),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingWordPressVersionSetInput = PorkbunEndpointInput<typeof hostingWordPressVersionSetEndpoint>
export type HostingWordPressVersionSetResponse = PorkbunEndpointOutput<typeof hostingWordPressVersionSetEndpoint>
