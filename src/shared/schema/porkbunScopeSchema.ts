import * as a from "valibot"

export const porkbunScopeSchema = a.picklist([
  "account",
  "dns",
  "domains",
  "email",
  "funding",
  "hosting",
  "none",
  "purchase",
  "read",
  "full",
])
export type PorkbunScope = a.InferOutput<typeof porkbunScopeSchema>
