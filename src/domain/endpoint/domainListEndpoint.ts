import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const domainListEndpoint = porkbunEndpointDefine({
  op: "domainList",
  method: "POST",
  path: "/domain/listAll",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List all domains",
  inputSchema: a.object({
    start: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description("Zero-based offset for pagination (default: 0). Returns up to 1000 domains per call."),
      ),
    ),
    includeLabels: a.optional(
      a.pipe(a.picklist(["yes", "no"]), a.description("Return label metadata for each domain. Defaults to no.")),
    ),
    domain: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Exact domain name match. Returns 0 or 1 result. Useful as an alternative to `/domain/get/{domain}`.",
        ),
      ),
    ),
    nameContains: a.optional(
      a.pipe(a.string(), a.description("Substring match against the full domain name. Case-insensitive.")),
    ),
    expiringWithinDays: a.optional(
      a.pipe(
        a.pipe(a.number(), a.integer()),
        a.description("Filter to domains expiring within this many days (relative to now)."),
      ),
    ),
    addedAfter: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Only domains added to this account at Porkbun (registered or transferred in) at or after this date or date-time, UTC. Compare `addedDate` in the response. To sy",
        ),
      ),
    ),
    addedBefore: a.optional(
      a.pipe(
        a.string(),
        a.description("Only domains added to this account at Porkbun before this date or date-time, UTC."),
      ),
    ),
    createdAfter: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Only domains whose registry creation date (`createDate`) is at or after this date or date-time, UTC. A transferred-in domain keeps its original creation date, s",
        ),
      ),
    ),
    createdBefore: a.optional(
      a.pipe(
        a.string(),
        a.description("Only domains whose registry creation date is before this date or date-time, UTC."),
      ),
    ),
    expiresAfter: a.optional(
      a.pipe(a.string(), a.description("Only domains expiring at or after this date or date-time, UTC.")),
    ),
    expiresBefore: a.optional(
      a.pipe(a.string(), a.description("Only domains expiring before this date or date-time, UTC.")),
    ),
    tlds: a.optional(a.pipe(a.array(a.string()), a.description("Limit to these TLDs (without leading dot)."))),
    autoRenew: a.optional(
      a.pipe(a.picklist(["yes", "no"]), a.description("Filter to domains with auto-renew on or off.")),
    ),
    apiAccess: a.optional(
      a.pipe(
        a.picklist(["yes", "no"]),
        a.description(
          "Filter to domains opted in to API access (yes) or not (no). Useful for finding domains an API key can actually operate on.",
        ),
      ),
    ),
    sortName: a.optional(
      a.pipe(
        a.picklist(["domain", "tld", "create_date", "added_date", "expire_date"]),
        a.description("Field to sort by. Default: `expire_date` ascending. `added_date` sorts by `addedDate`."),
      ),
    ),
    sortDirection: a.optional(a.pipe(a.picklist(["asc", "desc"]), a.description("Sort direction. Default: asc."))),
  }),
  responseSchema: a.looseObject({
    status: a.string(),
    count: a.optional(a.pipe(a.number(), a.integer())),
    domains: a.array(
      a.looseObject({
        domain: a.optional(a.string()),
        status: a.optional(a.string()),
        tld: a.optional(a.string()),
        createDate: a.optional(a.string()),
        addedDate: a.optional(a.string()),
        expireDate: a.optional(a.string()),
        securityLock: a.optional(a.pipe(a.number(), a.integer())),
        whoisPrivacy: a.optional(a.pipe(a.number(), a.integer())),
        autoRenew: a.optional(a.pipe(a.number(), a.integer())),
        apiAccess: a.optional(a.pipe(a.number(), a.integer())),
        notLocal: a.optional(a.pipe(a.number(), a.integer())),
        labels: a.optional(
          a.array(
            a.looseObject({ id: a.optional(a.string()), title: a.optional(a.string()), color: a.optional(a.string()) }),
          ),
        ),
      }),
    ),
  }),
})
export type DomainListInput = PorkbunEndpointInput<typeof domainListEndpoint>
export type DomainListResponse = PorkbunEndpointOutput<typeof domainListEndpoint>
