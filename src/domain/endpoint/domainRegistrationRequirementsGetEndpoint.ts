import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainRegistrationRequirementsGetEndpoint = porkbunEndpointDefine({
  op: "domainRegistrationRequirementsGet",
  method: "GET",
  path: "/domain/getRegistrationRequirements/{tld}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get TLD registration requirements (JSON Schema)",
  inputSchema: a.object({
    tld: a.pipe(a.string(), a.description("TLD without a leading dot, e.g. `com`, `us`, `ca`.")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    tld: a.optional(a.string()),
    apiRegisterable: a.optional(a.boolean()),
    registrationDurationYears: a.optional(a.pipe(a.number(), a.integer())),
    maxRegistrationYears: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
    whoisPrivacySupported: a.optional(a.boolean()),
    requiresValidatedAddress: a.optional(a.boolean()),
    registrantOnly: a.optional(a.boolean()),
    requestSchema: a.optional(a.record(a.string(), a.unknown())),
    registryRequirements: a.optional(a.nullable(a.record(a.string(), a.unknown()))),
    notApiRegisterableReason: a.optional(a.string()),
  }),
})
export type DomainRegistrationRequirementsGetInput = PorkbunEndpointInput<
  typeof domainRegistrationRequirementsGetEndpoint
>
export type DomainRegistrationRequirementsGetResponse = PorkbunEndpointOutput<
  typeof domainRegistrationRequirementsGetEndpoint
>
