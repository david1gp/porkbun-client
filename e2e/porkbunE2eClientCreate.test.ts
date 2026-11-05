import { expect, test } from "bun:test"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

for (const status of [429, 502, 503, 504]) {
  test(`e2e helper retries HTML HTTP ${status} up to four times with exponential backoff`, async () => {
    let count = 0
    const delays: number[] = []
    const client = porkbunE2eClientCreate({
      fetch: async () => {
        count++
        return count <= 4 ? new Response("<html>unavailable</html>", { status }) : Response.json({ status: "SUCCESS" })
      },
      sleep: async (milliseconds) => {
        delays.push(milliseconds)
      },
    })
    expect(client.success).toBe(true)
    if (!client.success) return
    expect(client.data.baseUrl).toBe("https://api.porkbun.com/api/json/v3/mock")
    expect(client.data.apiKey).toBe("pk1_mock")
    expect(client.data.secretApiKey).toBe("sk1_mock")
    const response = await client.data.fetch("https://unused.invalid")
    expect(response.status).toBe(200)
    expect(count).toBe(5)
    expect(delays).toEqual([250, 500, 1000, 2000])
  })
}

test("e2e helper honours Retry-After seconds and HTTP dates, preserving the original write body and headers", async () => {
  const delays: number[] = []
  const init: RequestInit = { method: "POST", body: "{}", headers: { "Idempotency-Key": "stable" } }
  let calls = 0
  const client = porkbunE2eClientCreate({
    fetch: async (_url, actualInit) => {
      expect(actualInit).toBe(init)
      calls++
      if (calls === 1) return new Response("busy", { status: 429, headers: { "Retry-After": "2" } })
      if (calls === 2)
        return new Response("busy", {
          status: 503,
          headers: { "Retry-After": new Date(Date.now() + 10000).toUTCString() },
        })
      return Response.json({ status: "SUCCESS" })
    },
    sleep: async (milliseconds) => {
      delays.push(milliseconds)
    },
  })
  if (!client.success) throw new Error(client.errorMessage)
  expect((await client.data.fetch("https://unused.invalid", init)).status).toBe(200)
  expect(delays[0]).toBe(2000)
  expect(delays[1]).toBeGreaterThanOrEqual(8500)
  expect(delays[1]).toBeLessThanOrEqual(10000)
})

for (const status of [400, 404, 500, 503]) {
  test(`e2e helper returns final HTTP ${status} without parsing it or retrying indefinitely`, async () => {
    let calls = 0
    const client = porkbunE2eClientCreate({
      fetch: async () => {
        calls++
        return new Response("original upstream body", { status })
      },
      sleep: async () => {},
    })
    if (!client.success) throw new Error(client.errorMessage)
    const response = await client.data.fetch("https://unused.invalid")
    expect(response.status).toBe(status)
    expect(await response.text()).toBe("original upstream body")
    expect(calls).toBe(status === 503 ? 5 : 1)
  })
}
