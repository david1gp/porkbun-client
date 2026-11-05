import { createResult, createResultError, type PromiseResult } from "#result"

export async function webhookSignatureVerify(input: {
  secret: string
  timestamp: string
  signature: string
  rawBody: string
  toleranceSeconds?: number
  now?: number
}): PromiseResult<true> {
  const op = "webhookSignatureVerify"
  if (!input.timestamp || !input.signature)
    return { ...createResultError(op, "Missing webhook signature or timestamp"), code: "WEBHOOK_HEADER_MISSING" }
  if (
    !/^\d+$/.test(input.timestamp) ||
    !Number.isSafeInteger(Number(input.timestamp)) ||
    !Number.isFinite(input.toleranceSeconds ?? 300) ||
    !Number.isFinite(input.now ?? Date.now() / 1000) ||
    (input.toleranceSeconds ?? 300) < 0 ||
    Math.abs((input.now ?? Date.now() / 1000) - Number(input.timestamp)) > (input.toleranceSeconds ?? 300)
  )
    return {
      ...createResultError(op, "Webhook timestamp is invalid or outside the allowed tolerance"),
      code: "WEBHOOK_TIMESTAMP_EXPIRED",
    }
  if (!/^sha256=[0-9a-f]{64}$/.test(input.signature))
    return { ...createResultError(op, "Invalid webhook signature"), code: "WEBHOOK_SIGNATURE_INVALID" }
  try {
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(input.secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    )
    const hex = input.signature.slice(7)
    const signature = Uint8Array.from(hex.match(/../g)!, (pair) => Number.parseInt(pair, 16))
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      encoder.encode(`${input.timestamp}.${input.rawBody}`),
    )
    if (!valid) return { ...createResultError(op, "Invalid webhook signature"), code: "WEBHOOK_SIGNATURE_INVALID" }
    return createResult(true as const)
  } catch (error) {
    return createResultError(op, "Webhook verification failed", error instanceof Error ? error.message : String(error))
  }
}
