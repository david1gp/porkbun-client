import { cliOptionCreate } from "./cliOptionCreate.js"
import { cliOptionSchemas } from "./cliOptionSchemas.js"

export const cliClientOptions = {
  apiKey: cliOptionCreate(cliOptionSchemas.nonEmptyString, "Porkbun API key (PORKBUN_API_KEY)", { optional: true }),
  secretApiKey: cliOptionCreate(cliOptionSchemas.nonEmptyString, "Porkbun secret API key (PORKBUN_SECRET_API_KEY)", {
    optional: true,
  }),
  baseUrl: cliOptionCreate(cliOptionSchemas.url, "Override API base URL (PORKBUN_BASE_URL)", { optional: true }),
  mock: { kind: "boolean", brief: "Use the credential-free mock API", optional: true },
  envPath: cliOptionCreate(cliOptionSchemas.nonEmptyString, "Path to environment file", { optional: true }),
} as const
