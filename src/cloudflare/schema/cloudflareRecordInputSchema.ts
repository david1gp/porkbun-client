import * as a from "valibot"

export const cloudflareRecordInputSchema = a.object({
  type: a.pipe(
    a.string(),
    a.description(
      "A, AAAA, CNAME, TXT, MX, NS, PTR or SPF for a plain `content` value. Structured types (SRV, CAA, TLSA\u2026) need `data` instead.",
    ),
  ),
  name: a.optional(
    a.pipe(a.string(), a.description("`@` for the apex, a bare label (`www`) is expanded, or a full hostname.")),
  ),
  content: a.optional(a.pipe(a.string(), a.description("The value the record points at."))),
  ttl: a.optional(
    a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description("1 = automatic (Cloudflare's default), otherwise 60\u201386400."),
    ),
  ),
  priority: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Required for MX; lower is preferred."))),
  proxied: a.optional(a.pipe(a.boolean(), a.description("Orange cloud. A/AAAA/CNAME only."))),
  comment: a.optional(a.pipe(a.string(), a.description("Free-text note stored on the record (100 chars)."))),
  data: a.optional(
    a.pipe(
      a.record(a.string(), a.unknown()),
      a.description(
        "Structured value for record types Cloudflare models as an object (SRV, CAA\u2026), passed through as given.",
      ),
    ),
  ),
})
