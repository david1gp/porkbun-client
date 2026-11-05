import * as a from "valibot"

export const cloudflareMoveStatusSchema = a.looseObject({
  domain: a.optional(a.string()),
  status: a.optional(a.string()),
  message: a.optional(a.string()),
  reason: a.optional(a.string()),
  zoneId: a.optional(a.nullable(a.string())),
  nameservers: a.optional(a.array(a.string())),
  previousNameservers: a.optional(a.array(a.string())),
})
