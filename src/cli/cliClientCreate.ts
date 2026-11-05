import * as a from "valibot"
import type { Result } from "#result"
import type { PorkbunClient } from "../shared/PorkbunClient.js"
import { porkbunClientCreate } from "../shared/porkbunClientCreate.js"
import { porkbunMockBaseUrl } from "../shared/porkbunMockBaseUrl.js"
import type { CliEnvironment } from "./CliEnvironment.js"
import { cliInputValidate } from "./cliInputValidate.js"

const inputSchema = a.object({
  apiKey: a.optional(a.string()),
  secretApiKey: a.optional(a.string()),
  baseUrl: a.optional(a.string()),
  mock: a.optional(a.boolean()),
})
export type CliClientInput = a.InferInput<typeof inputSchema>

export function cliClientCreate(
  input: CliClientInput,
  environment: CliEnvironment = process.env,
): Result<PorkbunClient> {
  const parsed = cliInputValidate(inputSchema, input, "cliClientCreate")
  if (!parsed.success) return parsed
  return porkbunClientCreate({
    apiKey: parsed.data.apiKey ?? environment.PORKBUN_API_KEY,
    secretApiKey: parsed.data.secretApiKey ?? environment.PORKBUN_SECRET_API_KEY,
    baseUrl: parsed.data.baseUrl ?? (parsed.data.mock ? porkbunMockBaseUrl : environment.PORKBUN_BASE_URL),
  })
}
