import * as a from "valibot"

export const porkbunDomainSchema = a.pipe(
  a.string(),
  a.trim(),
  a.toLowerCase(),
  a.minLength(1),
  a.maxLength(253),
  a.regex(
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/,
    "Expected a domain hostname (use punycode for international names)",
  ),
)
export type PorkbunDomain = a.InferOutput<typeof porkbunDomainSchema>
