import { expect, test } from "bun:test"
import * as a from "valibot"
import { transferAuthCodeUpdate } from "../src/transfer/api/transferAuthCodeUpdate.js"
import { transferCancel } from "../src/transfer/api/transferCancel.js"
import { transferCreate } from "../src/transfer/api/transferCreate.js"
import { transferGet } from "../src/transfer/api/transferGet.js"
import { transferList } from "../src/transfer/api/transferList.js"
import { transferPrepare } from "../src/transfer/api/transferPrepare.js"
import { transferSetupGet } from "../src/transfer/api/transferSetupGet.js"
import { transferStart } from "../src/transfer/api/transferStart.js"
import { transferAuthCodeUpdateEndpoint } from "../src/transfer/endpoint/transferAuthCodeUpdateEndpoint.js"
import { transferCancelEndpoint } from "../src/transfer/endpoint/transferCancelEndpoint.js"
import { transferCreateEndpoint } from "../src/transfer/endpoint/transferCreateEndpoint.js"
import { transferGetEndpoint } from "../src/transfer/endpoint/transferGetEndpoint.js"
import { transferListEndpoint } from "../src/transfer/endpoint/transferListEndpoint.js"
import { transferPrepareEndpoint } from "../src/transfer/endpoint/transferPrepareEndpoint.js"
import { transferSetupGetEndpoint } from "../src/transfer/endpoint/transferSetupGetEndpoint.js"
import { transferStartEndpoint } from "../src/transfer/endpoint/transferStartEndpoint.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const created = porkbunE2eClientCreate()
if (!created.success) throw new Error(created.errorMessage)
const client = created.data
test("live mock validates transferCreate", async () => {
  const result = await transferCreate(
    client,
    { domain: "example.com", authCode: "text", cost: 100 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates transferSetupGet", async () => {
  const result = await transferSetupGet(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferSetupGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates transferPrepare", async () => {
  const result = await transferPrepare(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferPrepareEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates transferStart", async () => {
  const result = await transferStart(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferStartEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates transferCancel", async () => {
  const result = await transferCancel(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferCancelEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates transferAuthCodeUpdate", async () => {
  const result = await transferAuthCodeUpdate(
    client,
    { domain: "example.com", authCode: "text" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferAuthCodeUpdateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates transferGet", async () => {
  const result = await transferGet(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates transferList", async () => {
  const result = await transferList(client, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(transferListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
