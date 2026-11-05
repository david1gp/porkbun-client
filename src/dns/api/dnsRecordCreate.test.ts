import { expect, test } from "bun:test"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { dnsRecordCreate } from "./dnsRecordCreate.js"
import { dnsRecordGet } from "./dnsRecordGet.js"

test("DNS create sends a typed record and parses numeric ID", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", id: 123 })
  const result = await dnsRecordCreate(client, { domain: "example.com", type: "A", content: "192.0.2.1", ttl: 600 })
  expect(result).toEqual({ success: true, data: { status: "SUCCESS", id: 123 } })
  expect(calls[0]?.url).toEndWith("/dns/create/example.com")
  expect(calls[0]?.body).toMatchObject({ type: "A", content: "192.0.2.1", ttl: 600 })
})

test("DNS get URL-encodes a record ID and parses string fields", async () => {
  const { client, calls } = porkbunTestClient({
    status: "SUCCESS",
    records: [{ id: "a/b", name: "example.com", ttl: "600", prio: null }],
  })
  const result = await dnsRecordGet(client, { domain: "example.com", id: "a/b" })
  expect(result.success).toBe(true)
  expect(calls[0]?.url).toEndWith("/dns/retrieve/example.com/a%2Fb")
})
