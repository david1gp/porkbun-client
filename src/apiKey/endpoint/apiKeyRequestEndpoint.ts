import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const apiKeyRequestEndpoint = porkbunEndpointDefine({
  op: "apiKeyRequest",
  method: "POST",
  path: "/apikey/request",
  auth: "none",
  scope: "none",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Initiate an API key authorization request",
  inputSchema: a.object({
    name: a.optional(
      a.pipe(
        a.pipe(a.string(), a.maxLength(255)),
        a.description(
          "Human-readable name for the application/integration requesting access. Optional but strongly recommended: it is shown to the account holder on the approval screen so they know what they're granting access to. If omitted, the approval page s",
        ),
      ),
    ),
    codeChallenge: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Optional PKCE (RFC 7636) binding. base64url(SHA-256(codeVerifier)), 43 unpadded chars. When present, the request uses lazy-mint delivery: after approval the account holder copies nothing, and /apikey/retrieve returns BOTH the public and sec",
        ),
      ),
    ),
    codeChallengeMethod: a.optional(
      a.pipe(a.picklist(["S256"]), a.description("PKCE challenge method. Only S256 is supported.")),
    ),
    sandbox: a.optional(
      a.pipe(
        a.boolean(),
        a.description(
          "If true, skip the approval flow and immediately return a throwaway SANDBOX key pair (public `pk1_sb_`, secret `sk1_sb_`) for a fresh test account seeded with $1000 fake credit. Use it as apikey/secretapikey against the same base URL to run ",
        ),
      ),
    ),
    returnUrl: a.optional(
      a.pipe(
        a.pipe(a.string(), a.maxLength(2048)),
        a.description(
          "Optional app-return redirect for native/mobile apps. Requires codeChallenge (PKCE). Must be an HTTPS URL your app claims as a Universal Link / App Link (custom URI schemes are rejected — another app could hijack them). After the account hol",
        ),
      ),
    ),
    scopes: a.optional(
      a.pipe(
        a.array(a.picklist(["read", "dns", "domains", "email", "hosting", "purchase", "funding", "account"])),
        a.description(
          'Optional permissions for the new key; `read` is always included. Shown to the account holder on the approval page, and the key gets exactly these. Leave out for a full-access key. Ask for the least you need, e.g. ["dns"] for a DNS updater. ',
        ),
      ),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    requestToken: a.string(),
    authUrl: a.optional(a.string()),
    expiration: a.optional(a.string()),
    deliveryMode: a.optional(a.picklist(["legacy", "pkce"])),
    message: a.optional(a.string()),
  }),
})
export type ApiKeyRequestInput = PorkbunEndpointInput<typeof apiKeyRequestEndpoint>
export type ApiKeyRequestResponse = PorkbunEndpointOutput<typeof apiKeyRequestEndpoint>
