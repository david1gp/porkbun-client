import { expect, test } from "bun:test"
import { porkbunBaseUrl } from "./porkbunBaseUrl.js"
import { porkbunClientCreate } from "./porkbunClientCreate.js"

test("client defaults allow public endpoints without credentials", () => {
  const result = porkbunClientCreate()
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(result.data.baseUrl).toBe(porkbunBaseUrl)
  expect(result.data.userAgent).toBe("porkbun-client/0.1.0")
  expect(result.data.fetch).toBe(globalThis.fetch)
  expect(result.data.apiKey).toBeUndefined()
})
test("client strips trailing slashes and normalizes credentials", () => {
  const result = porkbunClientCreate({ baseUrl: "https://example.com/api///", apiKey: " x ", secretApiKey: " y " })
  expect(result.success).toBe(true)
  if (result.success)
    expect(result.data).toMatchObject({ baseUrl: "https://example.com/api", apiKey: "x", secretApiKey: "y" })
})
test("client rejects invalid URLs, empty credentials, and a non-function fetch without leaking secrets", () => {
  for (const input of [
    { baseUrl: "invalid", secretApiKey: "hidden" },
    { baseUrl: "ftp://example.com" },
    { apiKey: "" },
    { fetch: null },
  ]) {
    // @ts-expect-error Intentionally invalid runtime fetch value.
    const result = porkbunClientCreate(input)
    expect(result.success).toBe(false)
    expect(JSON.stringify(result)).not.toContain("hidden")
  }
})
