import * as a from "valibot"
export const dnsRecordSchema = a.looseObject({
  id: a.optional(a.string()),
  name: a.optional(a.string()),
  type: a.optional(a.string()),
  content: a.optional(a.string()),
  ttl: a.optional(a.string()),
  prio: a.optional(a.nullable(a.string())),
  notes: a.optional(a.nullable(a.string())),
})
