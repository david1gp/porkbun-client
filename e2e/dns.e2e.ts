import { expect, test } from "bun:test"
import * as a from "valibot"
import { dnsHistoryDiff } from "../src/dns/api/dnsHistoryDiff.js"
import { dnsHistoryList } from "../src/dns/api/dnsHistoryList.js"
import { dnsHistoryRestore } from "../src/dns/api/dnsHistoryRestore.js"
import { dnsImport } from "../src/dns/api/dnsImport.js"
import { dnsPreflight } from "../src/dns/api/dnsPreflight.js"
import { dnsRecordCreate } from "../src/dns/api/dnsRecordCreate.js"
import { dnsRecordDelete } from "../src/dns/api/dnsRecordDelete.js"
import { dnsRecordDeleteByNameType } from "../src/dns/api/dnsRecordDeleteByNameType.js"
import { dnsRecordEdit } from "../src/dns/api/dnsRecordEdit.js"
import { dnsRecordEditByNameType } from "../src/dns/api/dnsRecordEditByNameType.js"
import { dnsRecordGet } from "../src/dns/api/dnsRecordGet.js"
import { dnsRecordList } from "../src/dns/api/dnsRecordList.js"
import { dnsRecordListByNameType } from "../src/dns/api/dnsRecordListByNameType.js"
import { dnsScan } from "../src/dns/api/dnsScan.js"
import { dnsHistoryDiffEndpoint } from "../src/dns/endpoint/dnsHistoryDiffEndpoint.js"
import { dnsHistoryListEndpoint } from "../src/dns/endpoint/dnsHistoryListEndpoint.js"
import { dnsHistoryRestoreEndpoint } from "../src/dns/endpoint/dnsHistoryRestoreEndpoint.js"
import { dnsImportEndpoint } from "../src/dns/endpoint/dnsImportEndpoint.js"
import { dnsPreflightEndpoint } from "../src/dns/endpoint/dnsPreflightEndpoint.js"
import { dnsRecordCreateEndpoint } from "../src/dns/endpoint/dnsRecordCreateEndpoint.js"
import { dnsRecordDeleteByNameTypeEndpoint } from "../src/dns/endpoint/dnsRecordDeleteByNameTypeEndpoint.js"
import { dnsRecordDeleteEndpoint } from "../src/dns/endpoint/dnsRecordDeleteEndpoint.js"
import { dnsRecordEditByNameTypeEndpoint } from "../src/dns/endpoint/dnsRecordEditByNameTypeEndpoint.js"
import { dnsRecordEditEndpoint } from "../src/dns/endpoint/dnsRecordEditEndpoint.js"
import { dnsRecordGetEndpoint } from "../src/dns/endpoint/dnsRecordGetEndpoint.js"
import { dnsRecordListByNameTypeEndpoint } from "../src/dns/endpoint/dnsRecordListByNameTypeEndpoint.js"
import { dnsRecordListEndpoint } from "../src/dns/endpoint/dnsRecordListEndpoint.js"
import { dnsScanEndpoint } from "../src/dns/endpoint/dnsScanEndpoint.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const result = porkbunE2eClientCreate()
if (!result.success) throw new Error(result.errorMessage)
const client = result.data
test("live mock: dnsRecordList", async () => {
  const result = await dnsRecordList(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsRecordListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsRecordGet", async () => {
  const result = await dnsRecordGet(
    client,
    { domain: "example.com", id: "123456789" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsRecordGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsRecordListByNameType", async () => {
  const result = await dnsRecordListByNameType(
    client,
    { domain: "example.com", type: "A", subdomain: "www" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(dnsRecordListByNameTypeEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsRecordCreate", async () => {
  const result = await dnsRecordCreate(
    client,
    { domain: "example.com", type: "A", content: "1.2.3.4" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsRecordCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsRecordEdit", async () => {
  const result = await dnsRecordEdit(
    client,
    { domain: "example.com", id: "123456789" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsRecordEditEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsRecordEditByNameType", async () => {
  const result = await dnsRecordEditByNameType(
    client,
    { domain: "example.com", type: "A", subdomain: "www", content: "5.6.7.8" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(dnsRecordEditByNameTypeEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsRecordDelete", async () => {
  const result = await dnsRecordDelete(
    client,
    { domain: "example.com", id: "123456789" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsRecordDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsRecordDeleteByNameType", async () => {
  const result = await dnsRecordDeleteByNameType(
    client,
    { domain: "example.com", type: "A", subdomain: "www" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(dnsRecordDeleteByNameTypeEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsPreflight", async () => {
  const result = await dnsPreflight(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsPreflightEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsHistoryList", async () => {
  const result = await dnsHistoryList(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsHistoryListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsHistoryDiff", async () => {
  const result = await dnsHistoryDiff(
    client,
    { domain: "example.com", snapshotId: 1234 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsHistoryDiffEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsHistoryRestore", async () => {
  const result = await dnsHistoryRestore(
    client,
    { domain: "example.com", snapshotId: 1234 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsHistoryRestoreEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsScan", async () => {
  const result = await dnsScan(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsScanEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock: dnsImport", async () => {
  const result = await dnsImport(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(dnsImportEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
