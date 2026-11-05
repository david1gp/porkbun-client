import * as a from "valibot"
import { createResultError, type ResultErr } from "#result"

// Error extraction is tolerant, even if a proxy/server sends an incomplete error.
const errorDetailsSchema = a.looseObject({
  message: a.optional(a.string()),
  code: a.optional(a.string()),
  next_action: a.optional(a.looseObject({ hint: a.optional(a.string()) })),
})

export function porkbunErrorResultCreate(op: string, body: unknown, statusCode: number, rawText: string): ResultErr {
  const parsed = a.safeParse(errorDetailsSchema, body)
  const details = parsed.success ? parsed.output : undefined
  const hint = details?.next_action?.hint
  return {
    ...createResultError(op, `${details?.message ?? `HTTP ${statusCode}`}${hint ? ` — next: ${hint}` : ""}`, rawText),
    ...(details?.code === undefined ? {} : { code: details.code }),
    statusCode,
  }
}
