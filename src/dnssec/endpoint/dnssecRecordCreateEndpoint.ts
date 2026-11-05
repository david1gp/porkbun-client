import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const dnssecRecordCreateEndpoint = porkbunEndpointDefine({
  op: "dnssecRecordCreate",
  method: "POST",
  path: "/dns/createDnssecRecord/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Create DNSSEC record",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    keyTag: a.pipe(a.string(), a.description("DNSSEC key tag")),
    alg: a.pipe(a.string(), a.description("DS Data algorithm number (e.g. 13 for ECDSA P-256 SHA-256)")),
    digestType: a.pipe(a.string(), a.description("Digest type number (e.g. 2 for SHA-256)")),
    digest: a.pipe(a.string(), a.description("Hex-encoded digest value")),
    maxSigLife: a.optional(
      a.pipe(a.string(), a.description("Maximum signature lifetime in seconds (optional, registry-specific)")),
    ),
    keyDataFlags: a.optional(
      a.pipe(a.string(), a.description("Key data flags (optional, used when submitting full key data)")),
    ),
    keyDataProtocol: a.optional(a.pipe(a.string(), a.description("Key data protocol (optional)"))),
    keyDataAlgo: a.optional(a.pipe(a.string(), a.description("Key data algorithm (optional)"))),
    keyDataPubKey: a.optional(a.pipe(a.string(), a.description("Key data public key in base64 (optional)"))),
  }),
  responseSchema: a.looseObject({
    warnings: a.optional(a.array(a.string())),
    status: a.picklist(["SUCCESS", "ERROR"]),
    message: a.optional(a.string()),
    code: a.optional(a.string()),
  }),
})
export type DnssecRecordCreateInput = PorkbunEndpointInput<typeof dnssecRecordCreateEndpoint>
export type DnssecRecordCreateResponse = PorkbunEndpointOutput<typeof dnssecRecordCreateEndpoint>
