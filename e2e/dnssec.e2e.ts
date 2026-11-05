import { expect, test } from "bun:test"
import * as a from "valibot"
import { dnssecRecordCreate } from "../src/dnssec/api/dnssecRecordCreate.js"
import { dnssecRecordDelete } from "../src/dnssec/api/dnssecRecordDelete.js"
import { dnssecRecordList } from "../src/dnssec/api/dnssecRecordList.js"
import { dnssecRecordCreateEndpoint } from "../src/dnssec/endpoint/dnssecRecordCreateEndpoint.js"
import { dnssecRecordDeleteEndpoint } from "../src/dnssec/endpoint/dnssecRecordDeleteEndpoint.js"
import { dnssecRecordListEndpoint } from "../src/dnssec/endpoint/dnssecRecordListEndpoint.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const result = porkbunE2eClientCreate()
if (!result.success) throw new Error(result.errorMessage)
const client = result.data
test("live mock: dnssecRecordList", async () => {
  const result = await dnssecRecordList(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnssecRecordListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnssecRecordCreate", async () => {
  const result = await dnssecRecordCreate(
    client,
    { domain: "example.com", keyTag: "12345", alg: "13", digestType: "2", digest: "ABCD1234..." },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnssecRecordCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnssecRecordDelete", async () => {
  const result = await dnssecRecordDelete(
    client,
    { domain: "example.com", keytag: "12345" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnssecRecordDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
