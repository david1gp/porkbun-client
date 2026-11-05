import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingFileDeployEndpoint = porkbunEndpointDefine({
  op: "hostingFileDeploy",
  method: "POST",
  path: "/hosting/deploy/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: true, reversible: true, requiresConfirmation: true },
  brief: "Upload site files (static hosting only)",
  inputSchema: a.object({
    files: a.pipe(
      a.array(
        a.object({
          path: a.optional(a.pipe(a.string(), a.description("path"))),
          content: a.optional(a.pipe(a.string(), a.description("base64-encoded file contents"))),
        }),
      ),
      a.description("files"),
    ),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    deployed: a.optional(a.array(a.string())),
    skipped: a.optional(a.array(a.looseObject({ path: a.optional(a.string()), reason: a.optional(a.string()) }))),
  }),
})
export type HostingFileDeployInput = PorkbunEndpointInput<typeof hostingFileDeployEndpoint>
export type HostingFileDeployResponse = PorkbunEndpointOutput<typeof hostingFileDeployEndpoint>
