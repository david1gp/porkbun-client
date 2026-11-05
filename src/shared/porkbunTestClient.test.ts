import type { PorkbunClient } from "./PorkbunClient.js"
import { porkbunClientCreate } from "./porkbunClientCreate.js"

export function porkbunTestClient(body: unknown = { status: "SUCCESS" }, status = 200) {
  const calls: { url: string; init?: RequestInit; headers: Headers; body: Record<string, unknown> | undefined }[] = []
  const result = porkbunClientCreate({
    apiKey: "pk1_test",
    secretApiKey: "sk1_test",
    fetch: async (url, init) => {
      calls.push({
        url: String(url),
        init,
        headers: new Headers(init?.headers),
        body: init?.body ? JSON.parse(String(init.body)) : undefined,
      })
      return new Response(typeof body === "string" ? body : JSON.stringify(body), { status })
    },
  })
  if (!result.success) throw new Error("Invalid test client fixture")
  return { client: result.data as PorkbunClient, calls }
}
