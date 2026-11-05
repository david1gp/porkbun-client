import { setTimeout } from "node:timers/promises"
import type { PorkbunFetch } from "../src/shared/PorkbunFetch.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

/** Test-only retries. Production clients deliberately never retry writes automatically. */
export function porkbunE2eClientCreate(
  options: {
    baseUrl?: string
    fetch?: PorkbunFetch
    sleep?: (milliseconds: number, signal?: AbortSignal | null) => Promise<void>
  } = {},
) {
  const fetch = options.fetch ?? globalThis.fetch
  const sleep =
    options.sleep ?? ((milliseconds, signal) => setTimeout(milliseconds, undefined, { signal: signal ?? undefined }))
  return porkbunClientCreate({
    baseUrl: options.baseUrl ?? porkbunMockBaseUrl,
    apiKey: "pk1_mock",
    secretApiKey: "sk1_mock",
    fetch: async (url, init) => {
      for (let attempt = 0; ; attempt++) {
        const response = await fetch(url, init)
        if (![429, 502, 503, 504].includes(response.status) || attempt === 4) return response
        const retryAfter = response.headers.get("Retry-After")
        const delay =
          retryAfter === null
            ? Number.NaN
            : /^\d+(\.\d+)?$/.test(retryAfter)
              ? Number(retryAfter) * 1000
              : Date.parse(retryAfter) - Date.now()
        await response.body?.cancel()
        await sleep(Number.isFinite(delay) ? Math.max(0, delay) : 250 * 2 ** attempt, init?.signal)
      }
    },
  })
}
