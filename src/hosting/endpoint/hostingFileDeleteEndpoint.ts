import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingFileDeleteEndpoint = porkbunEndpointDefine({
  op: "hostingFileDelete",
  method: "POST",
  path: "/hosting/deleteFile/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Delete a site file (static hosting only)",
  inputSchema: a.object({
    path: a.pipe(a.string(), a.description("path")),
    recursive: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "Delete a directory together with everything in it (up to 2,000 items per call; call again to continue). Without it, a non-empty directory returns HOSTING_DIR_NOT_EMPTY.",
        ),
      ),
    ),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({ status: a.optional(a.string()), deleted: a.optional(a.string()) }),
})
export type HostingFileDeleteInput = PorkbunEndpointInput<typeof hostingFileDeleteEndpoint>
export type HostingFileDeleteResponse = PorkbunEndpointOutput<typeof hostingFileDeleteEndpoint>
