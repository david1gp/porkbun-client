import * as a from "valibot"

export const porkbunErrorResponseSchema = a.looseObject({
  status: a.picklist(["ERROR"]),
  message: a.string(),
  code: a.optional(a.string()),
  account: a.optional(a.string()),
  next_action: a.optional(
    a.looseObject({
      type: a.optional(
        a.picklist([
          "fix_request",
          "authenticate",
          "enable_setting",
          "verify_account",
          "add_funds",
          "top_up",
          "retry",
          "wait_and_retry",
          "pay",
          "use_website",
          "choose_alternative",
          "contact_support",
          "none",
        ]),
      ),
      hint: a.optional(a.string()),
      url: a.optional(a.string()),
      retryable: a.optional(a.boolean()),
    }),
  ),
  ttlRemaining: a.optional(a.pipe(a.number(), a.integer())),
})
export type PorkbunErrorResponse = a.InferOutput<typeof porkbunErrorResponseSchema>
