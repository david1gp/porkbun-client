import * as a from "valibot"
import { dnsRecordSchema } from "./dnsRecordSchema.js"

/** Scan/history records use integer TTL/priority, unlike retrieve's string fields. */
export const dnsHistoryRecordSchema = a.looseObject({
  ...a.pick(dnsRecordSchema, ["name", "type", "content"]).entries,
  ttl: a.optional(a.pipe(a.number(), a.integer())),
  prio: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
})
