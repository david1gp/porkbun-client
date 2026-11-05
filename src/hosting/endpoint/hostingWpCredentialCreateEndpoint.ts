import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const hostingWpCredentialCreateEndpoint = porkbunEndpointDefine({
  op: "hostingWpCredentialCreate",
  method: "POST",
  path: "/hosting/createWpCredentials/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: true },
  brief: "Mint WordPress REST API credentials (WordPress only)",
  inputSchema: a.object({
    role: a.optional(
      a.pipe(
        a.picklist(["editor", "administrator"]),
        a.description(
          "Least privilege by default. `editor` = content only (recommended for agents). `administrator` = full control incl. plugin install; requires acknowledgeFullAccess.",
        ),
      ),
    ),
    acknowledgeFullAccess: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "Required when role=administrator: confirms you understand the credential can run arbitrary code on the site.",
        ),
      ),
    ),
    name: a.optional(
      a.pipe(
        a.pipe(a.string(), a.maxLength(40)),
        a.description("Label shown in wp-admin (sanitized to letters, digits and dashes)."),
      ),
    ),
    dryRun: a.optional(a.pipe(a.boolean(), a.description("Validate without creating anything."))),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    credentials: a.optional(
      a.looseObject({
        username: a.optional(a.string()),
        applicationPassword: a.optional(a.string()),
        role: a.optional(a.string()),
        name: a.optional(a.string()),
        restUrl: a.optional(a.string()),
        authorization: a.optional(a.string()),
      }),
    ),
    message: a.optional(a.string()),
  }),
})
export type HostingWpCredentialCreateInput = PorkbunEndpointInput<typeof hostingWpCredentialCreateEndpoint>
export type HostingWpCredentialCreateResponse = PorkbunEndpointOutput<typeof hostingWpCredentialCreateEndpoint>
