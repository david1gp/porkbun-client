import { expect, test } from "bun:test"
import { apiKeyPkcePairCreate } from "./apiKeyPkcePairCreate.js"

test("PKCE pairs use a random verifier bound to the S256 challenge", async () => {
  const pair = await apiKeyPkcePairCreate()
  const other = await apiKeyPkcePairCreate()
  expect(pair.codeVerifier).toMatch(/^[A-Za-z0-9_-]{43}$/)
  expect(pair.codeVerifier).not.toBe(other.codeVerifier)
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pair.codeVerifier))
  expect(pair.codeChallenge).toBe(Buffer.from(digest).toString("base64url"))
})
