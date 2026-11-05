import * as a from "valibot"
import { createResult, createResultError, type Result } from "#result"
import { packageVersion } from "../packageVersion.js"
import type { PorkbunClient } from "./PorkbunClient.js"
import type { PorkbunFetch } from "./PorkbunFetch.js"
import { porkbunBaseUrl } from "./porkbunBaseUrl.js"

const inputSchema = a.object({
  apiKey: a.optional(a.pipe(a.string(), a.trim(), a.minLength(1))),
  secretApiKey: a.optional(a.pipe(a.string(), a.trim(), a.minLength(1))),
  baseUrl: a.optional(
    a.pipe(
      a.string(),
      a.url(),
      a.check((value) => /^https?:\/\//.test(value), "Expected HTTP(S) URL"),
    ),
  ),
  fetch: a.optional(a.custom<PorkbunFetch>((value) => typeof value === "function", "fetch must be a function")),
  userAgent: a.optional(a.pipe(a.string(), a.minLength(1))),
})
export type PorkbunClientCreateInput = a.InferInput<typeof inputSchema>

export function porkbunClientCreate(input: PorkbunClientCreateInput = {}): Result<PorkbunClient> {
  const op = "porkbunClientCreate"
  const parsed = a.safeParse(inputSchema, input)
  // Do not include client input in errors: it contains secrets.
  if (!parsed.success) return createResultError(op, a.summarize(parsed.issues))
  return createResult({
    ...parsed.output,
    baseUrl: (parsed.output.baseUrl ?? porkbunBaseUrl).replace(/\/+$/, ""),
    fetch: parsed.output.fetch ?? globalThis.fetch,
    userAgent: parsed.output.userAgent ?? `porkbun-client/${packageVersion}`,
  })
}
