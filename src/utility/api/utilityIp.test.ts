import { expect, test } from "bun:test"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { utilityIp } from "./utilityIp.js"

test("utilityIp retrieves caller IP without sending credentials", async () => {
  const response = { status: "SUCCESS", yourIp: "1.2.3.4", xForwardedFor: "1.2.3.4" }
  const { client, calls } = porkbunTestClient(response)
  delete client.apiKey
  delete client.secretApiKey
  const result = await utilityIp(client)
  expect(result).toEqual({ success: true, data: response })
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/ip")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.body).toBeUndefined()
  expect(calls[0]!.headers.get("accept")).toBe("application/json")
  expect(calls[0]!.headers.has("idempotency-key")).toBe(false)
  expect(calls[0]!.headers.has("x-api-key")).toBe(false)
})

test("utilityIp preserves API errors and rejects malformed success responses", async () => {
  const error = porkbunTestClient({ status: "ERROR", code: "INVALID_API_KEY", message: "Invalid key" }, 400)
  expect(await utilityIp(error.client)).toMatchObject({
    success: false,
    op: "utilityIp",
    code: "INVALID_API_KEY",
    statusCode: 400,
  })
  const invalid = porkbunTestClient({ status: "SUCCESS", yourIp: 123 })
  expect((await utilityIp(invalid.client)).success).toBe(false)
})
