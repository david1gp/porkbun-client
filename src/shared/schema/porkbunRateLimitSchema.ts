import * as a from "valibot"

export const porkbunRateLimitSchema = a.looseObject({
  TTL: a.optional(a.pipe(a.number(), a.integer())),
  limit: a.optional(a.pipe(a.number(), a.integer())),
  used: a.optional(a.pipe(a.number(), a.integer())),
  naturalLanguage: a.optional(a.string()),
})
export type PorkbunRateLimit = a.InferOutput<typeof porkbunRateLimitSchema>
