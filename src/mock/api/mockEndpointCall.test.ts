import { expect, test } from "bun:test"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { mockEndpointCall } from "./mockEndpointCall.js"

test("mock call preserves path separators and encodes individual path segments", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", name: "example" })
  const result = await mockEndpointCall(client, { path: "dns/create/a b.com", method: "POST" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/mock/dns/create/a%20b.com")
  expect(calls[0]!.init?.method).toBe("POST")
})

test("mock call returns error examples as data and rejects traversal", async () => {
  const { client, calls } = porkbunTestClient({ status: "ERROR", message: "Example" })
  expect((await mockEndpointCall(client, { path: "domain/listAll", status: "error" })).success).toBe(true)
  expect(calls[0]!.url.endsWith("?status=error")).toBe(true)
  expect((await mockEndpointCall(client, { path: "../ping" })).success).toBe(false)
})
