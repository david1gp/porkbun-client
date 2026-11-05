import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const apiKeyRetrieveEndpoint = porkbunEndpointDefine({
  op: "apiKeyRetrieve",
  method: "POST",
  path: "/apikey/retrieve",
  auth: "none",
  scope: "none",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Poll for API key approval",
  inputSchema: a.object({
    requestToken: a.pipe(
      a.string(),
      a.description("The token returned by /apikey/request. Must be a 64-character lowercase hex string."),
    ),
    codeVerifier: a.optional(
      a.pipe(
        a.pipe(a.string(), a.minLength(43), a.maxLength(128)),
        a.description(
          "PKCE verifier (RFC 7636). Required only when the request was created with a codeChallenge. The high-entropy secret whose base64url(SHA-256(codeVerifier)) equals that challenge. When it matches, this response includes the secret key (secreta",
        ),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.picklist(["SUCCESS", "PENDING", "ERROR"])),
    apikey: a.optional(a.string()),
    secretapikey: a.optional(a.string()),
    message: a.optional(a.string()),
    code: a.optional(a.string()),
  }),
})
export type ApiKeyRetrieveInput = PorkbunEndpointInput<typeof apiKeyRetrieveEndpoint>
export type ApiKeyRetrieveResponse = PorkbunEndpointOutput<typeof apiKeyRetrieveEndpoint>
