import { expect, test } from "bun:test"
import * as a from "valibot"
import { webhookEventSchema } from "../schema/webhookEventSchema.js"
import { webhookRequestParse } from "./webhookRequestParse.js"
import { webhookSignatureVerify } from "./webhookSignatureVerify.js"

async function sign(secret: string, timestamp: string, body: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ])
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${body}`))
  return `sha256=${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`
}

test("signature verification accepts a valid signature and rejects altered payloads and replay", async () => {
  const input = { secret: "secret", timestamp: "1000", rawBody: '{"x":1}', now: 1000 }
  const signature = await sign(input.secret, input.timestamp, input.rawBody)
  expect(await webhookSignatureVerify({ ...input, signature })).toEqual({ success: true, data: true })
  expect(await webhookSignatureVerify({ ...input, signature, rawBody: "{}" })).toMatchObject({
    success: false,
    code: "WEBHOOK_SIGNATURE_INVALID",
  })
  expect(await webhookSignatureVerify({ ...input, signature, now: 1301 })).toMatchObject({
    success: false,
    code: "WEBHOOK_TIMESTAMP_EXPIRED",
  })
  expect(await webhookSignatureVerify({ ...input, signature: "" })).toMatchObject({
    success: false,
    code: "WEBHOOK_HEADER_MISSING",
  })
  expect(await webhookSignatureVerify({ ...input, signature: "sha256=00" })).toMatchObject({
    success: false,
    code: "WEBHOOK_SIGNATURE_INVALID",
  })
  expect(await webhookSignatureVerify({ ...input, timestamp: "NaN", signature })).toMatchObject({
    success: false,
    code: "WEBHOOK_TIMESTAMP_EXPIRED",
  })
})

test("request parser verifies raw bytes before parsing and validates known events", async () => {
  const secret = "secret"
  const timestamp = String(Math.floor(Date.now() / 1000))
  const body = JSON.stringify({
    event: "webhook.test",
    id: "id",
    createdAt: "2026-01-01T00:00:00Z",
    data: { endpointId: 1, message: "test" },
  })
  const signature = await sign(secret, timestamp, body)
  const request = (text: string, sig = signature) =>
    new Request("https://example.com", {
      method: "POST",
      headers: { "X-Porkbun-Signature": sig, "X-Porkbun-Webhook-Timestamp": timestamp },
      body: text,
    })
  expect(await webhookRequestParse(request(body), secret)).toMatchObject({
    success: true,
    data: { event: "webhook.test" },
  })
  expect(await webhookRequestParse(request(`${body} `), secret)).toMatchObject({
    success: false,
    code: "WEBHOOK_SIGNATURE_INVALID",
  })
  const invalid = "{"
  expect(await webhookRequestParse(request(invalid, await sign(secret, timestamp, invalid)), secret)).toMatchObject({
    success: false,
    code: "WEBHOOK_BODY_INVALID",
  })
})

test("unknown events remain forward-compatible while malformed known events are rejected", () => {
  const envelope = { id: "id", createdAt: "2026-01-01T00:00:00Z" }
  expect(a.safeParse(webhookEventSchema, { ...envelope, event: "future.event", data: { newField: 1 } }).success).toBe(
    true,
  )
  expect(a.safeParse(webhookEventSchema, { ...envelope, event: "webhook.test", data: {} }).success).toBe(false)
})
