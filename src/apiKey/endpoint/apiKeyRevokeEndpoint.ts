import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const apiKeyRevokeEndpoint = porkbunEndpointDefine({
  op: "apiKeyRevoke",
  method: "POST",
  path: "/apikey/revoke",
  auth: "required",
  scope: "read",
  agent: { safe: false, cost: false, destructive: true, reversible: false, requiresConfirmation: true },
  brief: "Revoke the calling API key",
  inputSchema: a.object({ confirm: a.pipe(a.picklist(["revoke"]), a.description("Must be `revoke`.")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    revoked: a.optional(
      a.looseObject({
        title: a.optional(a.string()),
        apikey: a.optional(a.string()),
        connectedApp: a.optional(a.boolean()),
      }),
    ),
    message: a.optional(a.string()),
  }),
})
export type ApiKeyRevokeInput = PorkbunEndpointInput<typeof apiKeyRevokeEndpoint>
export type ApiKeyRevokeResponse = PorkbunEndpointOutput<typeof apiKeyRevokeEndpoint>
