import { expect, test } from "bun:test"
import * as a from "valibot"
import {
  porkbunClientCreate,
  porkbunMockBaseUrl,
  utilityIp,
  utilityIpEndpoint,
  utilityPing,
  utilityPingEndpoint,
} from "../dist/index.js"

const clientResult = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl, apiKey: "pk1_mock", secretApiKey: "sk1_mock" })
if (!clientResult.success) throw new Error(clientResult.errorMessage)
const client = clientResult.data

test("live mock returns a schema-valid utility ping with credential body", async () => {
  const result = await utilityPing(client, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(a.safeParse(utilityPingEndpoint.responseSchema, result.data).success).toBe(true)
  expect(result.data.yourIp).toBeString()
}, 35000)

test("live mock returns a schema-valid credential-free utility IP", async () => {
  const result = await utilityIp(client, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(a.safeParse(utilityIpEndpoint.responseSchema, result.data).success).toBe(true)
  expect(result.data.yourIp).toBeString()
}, 35000)
