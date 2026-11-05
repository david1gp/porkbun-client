import { expect, test } from "bun:test"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { utilityPing } from "./utilityPing.js"

test("utilityPing validates credentials using a safe POST", async () => {
  const response = {
    status: "SUCCESS",
    yourIp: "1.2.3.4",
    xForwardedFor: "1.2.3.4",
    credentialsValid: true,
    account: "test",
    scopes: ["read", "dns"],
  }
  const { client, calls } = porkbunTestClient(response)
  const result = await utilityPing(client)
  expect(result).toEqual({ success: true, data: response })
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/ping")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  expect(calls[0]!.headers.get("accept")).toBe("application/json")
  expect(calls[0]!.headers.has("idempotency-key")).toBe(false)
  expect(calls[0]!.headers.has("x-api-key")).toBe(false)
})

test("utilityPing preserves API errors and rejects malformed success responses", async () => {
  const error = porkbunTestClient({ status: "ERROR", code: "INVALID_API_KEY", message: "Invalid key" }, 400)
  expect(await utilityPing(error.client)).toMatchObject({
    success: false,
    op: "utilityPing",
    code: "INVALID_API_KEY",
    statusCode: 400,
  })
  const invalid = porkbunTestClient({ status: "SUCCESS", yourIp: 123 })
  expect((await utilityPing(invalid.client)).success).toBe(false)
})
