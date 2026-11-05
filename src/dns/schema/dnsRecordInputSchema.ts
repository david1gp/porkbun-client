import * as a from "valibot"

/** Common fields; import accepts any type (including ignored NS/SOA) and null priority. */
export const dnsRecordInputSchema = a.object({
  name: a.optional(
    a.pipe(
      a.string(),
      a.description("Subdomain prefix, empty for apex. Import also accepts @ or a fully-qualified name."),
    ),
  ),
  type: a.optional(a.pipe(a.string(), a.description("DNS record type; NS and SOA are ignored on import."))),
  content: a.optional(a.pipe(a.string(), a.description("Record value"))),
  ttl: a.optional(a.pipe(a.number(), a.integer(), a.description("TTL in seconds; defaults to the account minimum."))),
  prio: a.optional(a.pipe(a.nullable(a.pipe(a.number(), a.integer())), a.description("Priority for MX/SRV records"))),
})
