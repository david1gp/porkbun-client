import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingBackupListEndpoint = porkbunEndpointDefine({
  op: "hostingBackupList",
  method: "POST",
  path: "/hosting/backups/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List backups",
  inputSchema: a.object({
    staging: a.optional(
      a.pipe(a.boolean(), a.description("true: act on the site's staging copy instead of the live site.")),
    ),
    limit: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Default 100."))),
    type: a.optional(a.pipe(a.picklist(["files", "database"]), a.description("type"))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    domain: a.optional(a.string()),
    target: a.optional(a.picklist(["live", "staging"])),
    backups: a.optional(
      a.array(
        a.looseObject({
          id: a.optional(a.string()),
          type: a.optional(a.picklist(["files", "database"])),
          onDemand: a.optional(a.boolean()),
          createdAt: a.optional(a.string()),
          bytes: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        }),
      ),
    ),
    count: a.optional(a.pipe(a.number(), a.integer())),
    total: a.optional(a.pipe(a.number(), a.integer())),
    retention: a.optional(a.string()),
    message: a.optional(a.string()),
  }),
})
export type HostingBackupListInput = PorkbunEndpointInput<typeof hostingBackupListEndpoint>
export type HostingBackupListResponse = PorkbunEndpointOutput<typeof hostingBackupListEndpoint>
