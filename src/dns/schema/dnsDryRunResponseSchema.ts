import * as a from "valibot"
import { dnsHistoryRecordSchema } from "./dnsHistoryRecordSchema.js"

/** DNS validation previews are not paid registration/renewal previews. */
export const dnsDryRunResponseSchema = a.looseObject({
  status: a.string(),
  dryRun: a.literal(true),
  wouldSucceed: a.boolean(),
  domain: a.optional(a.string()),
  message: a.optional(a.string()),
  warnings: a.optional(a.array(a.string())),
  existingId: a.optional(a.string()),
  records: a.optional(a.array(dnsHistoryRecordSchema)),
})
export type DnsDryRunResponse = a.InferOutput<typeof dnsDryRunResponseSchema>
