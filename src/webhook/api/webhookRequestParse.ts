import * as a from "valibot"
import { createResult, createResultError, type PromiseResult } from "#result"
import { type WebhookEvent, webhookEventSchema } from "../schema/webhookEventSchema.js"
import { webhookSignatureVerify } from "./webhookSignatureVerify.js"

export async function webhookRequestParse(request: Request, secret: string): PromiseResult<WebhookEvent> {
  const op = "webhookRequestParse"
  const signature = request.headers.get("X-Porkbun-Signature") ?? ""
  const timestamp = request.headers.get("X-Porkbun-Webhook-Timestamp") ?? ""
  let body: string
  try {
    body = await request.text()
  } catch (error) {
    return createResultError(op, "Unable to read request body", String(error))
  }
  const verified = await webhookSignatureVerify({ secret, timestamp, signature, rawBody: body })
  if (!verified.success) return verified
  let json: unknown
  try {
    json = JSON.parse(body)
  } catch {
    return { ...createResultError(op, "Invalid webhook JSON"), code: "WEBHOOK_BODY_INVALID" }
  }
  const parsed = a.safeParse(webhookEventSchema, json)
  if (!parsed.success) return { ...createResultError(op, a.summarize(parsed.issues)), code: "WEBHOOK_BODY_INVALID" }
  return createResult(parsed.output)
}
