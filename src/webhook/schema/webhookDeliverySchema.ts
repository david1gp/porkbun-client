import * as a from "valibot"

export const webhookDeliverySchema = a.looseObject({
  id: a.optional(a.pipe(a.number(), a.integer())),
  endpointId: a.optional(a.pipe(a.number(), a.integer())),
  eventType: a.optional(a.string()),
  eventId: a.optional(a.string()),
  status: a.optional(a.picklist(["PENDING", "PROCESSING", "DELIVERED", "FAILED"])),
  attempts: a.optional(a.pipe(a.number(), a.integer())),
  maxAttempts: a.optional(a.pipe(a.number(), a.integer())),
  httpStatus: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
  lastError: a.optional(a.nullable(a.string())),
  nextAttemptAt: a.optional(a.string()),
  createDate: a.optional(a.string()),
  deliveredDate: a.optional(a.nullable(a.string())),
  payload: a.optional(a.record(a.string(), a.unknown())),
})
