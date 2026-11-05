import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { domainContactSchema } from "../schema/domainContactSchema.js"

export const domainContactUpdateEndpoint = porkbunEndpointDefine({
  op: "domainContactUpdate",
  method: "POST",
  path: "/domain/updateContacts/{domain}",
  auth: "required",
  scope: "domains",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update domain contacts",
  inputSchema: a.object({
    contacts: a.optional(
      a.pipe(
        a.object({
          registrant: a.optional(a.pipe(domainContactSchema, a.description("registrant"))),
          admin: a.optional(a.pipe(domainContactSchema, a.description("admin"))),
          tech: a.optional(a.pipe(domainContactSchema, a.description("tech"))),
          billing: a.optional(a.pipe(domainContactSchema, a.description("billing"))),
        }),
        a.description("Any subset of roles to change; unspecified roles are left as-is."),
      ),
    ),
    contact: a.optional(
      a.pipe(
        a.object({
          firstName: a.optional(a.pipe(a.string(), a.description("firstName"))),
          lastName: a.optional(a.pipe(a.string(), a.description("lastName"))),
          organization: a.optional(a.pipe(a.string(), a.description("organization"))),
          address1: a.optional(a.pipe(a.string(), a.description("address1"))),
          address2: a.optional(a.pipe(a.string(), a.description("address2"))),
          address3: a.optional(a.pipe(a.string(), a.description("address3"))),
          city: a.optional(a.pipe(a.string(), a.description("city"))),
          state: a.optional(a.pipe(a.string(), a.description("State/province; may be empty where not applicable."))),
          postalCode: a.optional(a.pipe(a.string(), a.description("postalCode"))),
          country: a.optional(a.pipe(a.string(), a.description("ISO 3166-1 alpha-2 country code."))),
          phone: a.optional(a.pipe(a.string(), a.description("National phone number, digits only."))),
          phoneCountryCode: a.optional(a.pipe(a.string(), a.description("Numeric international calling code."))),
          fax: a.optional(a.pipe(a.string(), a.description("fax"))),
          email: a.optional(a.pipe(a.string(), a.description("email"))),
        }),
        a.description("A single contact applied to all four roles. Use this OR `contacts`, not both."),
      ),
    ),
    dryRun: a.optional(
      a.pipe(a.boolean(), a.description("Validate and report wouldSucceed without applying the change.")),
    ),
    addressValidationChoice: a.optional(
      a.pipe(
        a.picklist(["accept_suggestion", "use_as_entered"]),
        a.description(
          "Only for a registrant change on an address-validated TLD after an ADDRESS_VALIDATION_REQUIRED response. 'accept_suggestion' saves the standardized suggestedAddr",
        ),
      ),
    ),
    domain: a.pipe(a.string(), a.description("domain")),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    message: a.optional(a.string()),
    registrantChanged: a.optional(a.boolean()),
  }),
})
export type DomainContactUpdateInput = PorkbunEndpointInput<typeof domainContactUpdateEndpoint>
export type DomainContactUpdateResponse = PorkbunEndpointOutput<typeof domainContactUpdateEndpoint>
