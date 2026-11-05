import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingFileListEndpoint = porkbunEndpointDefine({
  op: "hostingFileList",
  method: "GET",
  path: "/hosting/files/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List site files (static hosting only)",
  inputSchema: a.object({ domain: a.pipe(a.string(), a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    path: a.optional(a.string()),
    files: a.optional(a.array(a.string())),
  }),
})
export type HostingFileListInput = PorkbunEndpointInput<typeof hostingFileListEndpoint>
export type HostingFileListResponse = PorkbunEndpointOutput<typeof hostingFileListEndpoint>
