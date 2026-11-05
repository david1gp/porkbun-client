import type { PorkbunFetch } from "./PorkbunFetch.js"
export type PorkbunClient = {
  apiKey?: string
  secretApiKey?: string
  baseUrl: string
  fetch: PorkbunFetch
  userAgent: string
}
