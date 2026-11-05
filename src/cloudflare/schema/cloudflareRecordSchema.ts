import * as a from "valibot"

export const cloudflareRecordSchema = a.looseObject({
  id: a.optional(a.string()),
  type: a.optional(a.string()),
  name: a.optional(a.string()),
  content: a.optional(a.string()),
  ttl: a.optional(a.number()),
  priority: a.optional(a.number()),
  proxied: a.optional(a.boolean()),
  proxiable: a.optional(a.boolean()),
  comment: a.optional(a.nullable(a.string())),
  data: a.optional(a.record(a.string(), a.unknown())),
})
