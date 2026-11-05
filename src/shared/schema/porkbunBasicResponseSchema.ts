import * as a from "valibot"
import { porkbunDnsWriteWarningsSchema } from "./porkbunDnsWriteWarningsSchema.js"
import { porkbunStatusSchema } from "./porkbunStatusSchema.js"
export const porkbunBasicResponseSchema = a.looseObject({
  status: porkbunStatusSchema,
  warnings: a.optional(porkbunDnsWriteWarningsSchema),
  message: a.optional(a.string()),
  code: a.optional(a.string()),
})
export type PorkbunBasicResponse = a.InferOutput<typeof porkbunBasicResponseSchema>
