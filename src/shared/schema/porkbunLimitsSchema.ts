import * as a from "valibot"
import { porkbunRateLimitSchema } from "./porkbunRateLimitSchema.js"
export const porkbunLimitsSchema = a.looseObject({
  attempts: a.optional(porkbunRateLimitSchema),
  success: a.optional(porkbunRateLimitSchema),
})
export type PorkbunLimits = a.InferOutput<typeof porkbunLimitsSchema>
