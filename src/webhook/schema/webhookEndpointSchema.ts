import * as a from "valibot"

export const webhookEndpointSchema = a.looseObject({
  id: a.optional(a.pipe(a.number(), a.integer())),
  url: a.optional(a.string()),
  secret: a.optional(a.string()),
  events: a.optional(a.array(a.string())),
  status: a.optional(a.picklist(["ACTIVE", "DISABLED"])),
  consecutiveFailures: a.optional(a.pipe(a.number(), a.integer())),
  lastSuccessDate: a.optional(a.nullable(a.string())),
  lastFailureDate: a.optional(a.nullable(a.string())),
  lastError: a.optional(a.nullable(a.string())),
  createDate: a.optional(a.string()),
})
