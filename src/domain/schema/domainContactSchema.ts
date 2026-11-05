import * as a from "valibot"

export const domainContactSchema = a.looseObject({
  firstName: a.optional(a.string()),
  lastName: a.optional(a.string()),
  organization: a.optional(a.string()),
  address1: a.optional(a.string()),
  address2: a.optional(a.string()),
  address3: a.optional(a.string()),
  city: a.optional(a.string()),
  state: a.optional(a.string()),
  postalCode: a.optional(a.string()),
  country: a.optional(a.string()),
  phone: a.optional(a.string()),
  phoneCountryCode: a.optional(a.string()),
  fax: a.optional(a.string()),
  email: a.optional(a.string()),
})
