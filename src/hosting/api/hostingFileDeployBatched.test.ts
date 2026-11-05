import { expect, test } from "bun:test"
import { porkbunClientCreate } from "../../shared/porkbunClientCreate.js"
import { hostingFileDeployBatched } from "./hostingFileDeployBatched.js"

test("batches requests within 10 MB and reports partial deployment on failure", async () => {
  const bodies: string[] = []
  const client = porkbunClientCreate({
    apiKey: "key",
    secretApiKey: "secret",
    fetch: async (_url, init) => {
      bodies.push(String(init?.body))
      return bodies.length === 1
        ? Response.json({ status: "SUCCESS", deployed: ["one"] })
        : Response.json({ status: "ERROR", message: "failed" }, { status: 500 })
    },
  })
  expect(client.success).toBe(true)
  if (!client.success) return
  const result = await hostingFileDeployBatched(client.data, {
    domain: "example.com",
    files: [
      { path: "one", content: "a".repeat(5_100_000) },
      { path: "two", content: "b".repeat(5_100_000) },
    ],
  })
  expect(bodies.length).toBe(2)
  expect(bodies.every((body) => Buffer.byteLength(body) <= 10_000_000)).toBe(true)
  expect(result.success).toBe(false)
  if (!result.success) expect(result.errorMessage).toContain('Batch 2/2 failed after deploying ["one"]')
})

test("replaying a batched deploy reuses distinct stable keys for each payload", async () => {
  const keys: (string | null)[] = []
  const client = porkbunClientCreate({
    apiKey: "key",
    secretApiKey: "secret",
    fetch: async (_url, init) => {
      keys.push(new Headers(init?.headers).get("Idempotency-Key"))
      return Response.json({ status: "SUCCESS", deployed: [] })
    },
  })
  if (!client.success) throw new Error(client.errorMessage)
  const input = {
    domain: "example.com",
    files: [
      { path: "one", content: "a".repeat(5_100_000) },
      { path: "two", content: "b".repeat(5_100_000) },
    ],
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    expect((await hostingFileDeployBatched(client.data, input, { idempotencyKey: "deploy-123" })).success).toBe(true)
  }
  expect(keys).toEqual(["deploy-123", "deploy-123:2", "deploy-123", "deploy-123:2"])
})
