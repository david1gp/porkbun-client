import * as a from "valibot"
import { transferStatusSchema } from "./transferStatusSchema.js"
export const transferItemSchema = a.looseObject({
  domain: a.optional(a.string()),
  status: a.optional(transferStatusSchema),
  statusDescription: a.optional(a.string()),
  transferDate: a.optional(a.string()),
  orderId: a.optional(a.pipe(a.number(), a.integer())),
})
