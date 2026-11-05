import * as a from "valibot"

const envelope = { id: a.string(), createdAt: a.string() }
const domain = { domain: a.string(), tld: a.string() }
const dns = { domain: a.string(), name: a.string(), id: a.string(), type: a.string(), content: a.string() }
const cloudflare = {
  domain: a.string(),
  message: a.string(),
  cfAccountId: a.string(),
  zoneId: a.nullable(a.string()),
  previousNameservers: a.array(a.string()),
  assignedNameservers: a.array(a.string()),
  completedAt: a.string(),
}
const known = a.variant("event", [
  a.looseObject({
    ...envelope,
    event: a.literal("domain.registered"),
    data: a.looseObject({ ...domain, expireDate: a.string() }),
  }),
  a.looseObject({
    ...envelope,
    event: a.literal("domain.renewed"),
    data: a.looseObject({ ...domain, expireDate: a.string() }),
  }),
  a.looseObject({ ...envelope, event: a.literal("domain.transfer.completed"), data: a.looseObject(domain) }),
  a.looseObject({
    ...envelope,
    event: a.literal("domain.expiring"),
    data: a.looseObject({ ...domain, daysToExpire: a.picklist([60, 30, 5]), expireDate: a.string() }),
  }),
  a.looseObject({
    ...envelope,
    event: a.literal("dns.record.created"),
    data: a.looseObject({ ...dns, ttl: a.string(), prio: a.nullable(a.string()) }),
  }),
  a.looseObject({
    ...envelope,
    event: a.literal("dns.record.updated"),
    data: a.looseObject({ ...dns, ttl: a.string(), prio: a.nullable(a.string()) }),
  }),
  a.looseObject({ ...envelope, event: a.literal("dns.record.deleted"), data: a.looseObject(dns) }),
  a.looseObject({
    ...envelope,
    event: a.literal("account.verification.code_sent"),
    data: a.looseObject({
      channel: a.picklist(["email", "phone"]),
      method: a.picklist(["email", "sms", "call"]),
      sentTo: a.string(),
      expiresInMinutes: a.number(),
    }),
  }),
  a.looseObject({
    ...envelope,
    event: a.literal("account.verification.completed"),
    data: a.looseObject({
      channel: a.picklist(["email", "phone"]),
      emailVerified: a.boolean(),
      phoneVerified: a.boolean(),
    }),
  }),
  a.looseObject({
    ...envelope,
    event: a.literal("cloudflare.connect.completed"),
    data: a.looseObject({ ...cloudflare, status: a.literal("done") }),
  }),
  a.looseObject({
    ...envelope,
    event: a.literal("cloudflare.connect.failed"),
    data: a.looseObject({ ...cloudflare, status: a.picklist(["failed", "skipped"]) }),
  }),
  a.looseObject({
    ...envelope,
    event: a.literal("webhook.test"),
    data: a.looseObject({ endpointId: a.number(), message: a.string() }),
  }),
])
const knownEvents = new Set([
  "domain.registered",
  "domain.renewed",
  "domain.transfer.completed",
  "domain.expiring",
  "dns.record.created",
  "dns.record.updated",
  "dns.record.deleted",
  "account.verification.code_sent",
  "account.verification.completed",
  "cloudflare.connect.completed",
  "cloudflare.connect.failed",
  "webhook.test",
])
export const webhookEventSchema = a.union([
  known,
  a.looseObject({
    ...envelope,
    event: a.pipe(
      a.string(),
      a.check((event) => !knownEvents.has(event)),
    ),
    data: a.record(a.string(), a.unknown()),
  }),
])
export type WebhookEvent = a.InferOutput<typeof webhookEventSchema>
