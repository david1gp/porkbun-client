import { expect, test } from "bun:test"
import * as a from "valibot"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { transferAuthCodeUpdateEndpoint } from "../endpoint/transferAuthCodeUpdateEndpoint.js"
import { transferCancelEndpoint } from "../endpoint/transferCancelEndpoint.js"
import { transferCreateEndpoint } from "../endpoint/transferCreateEndpoint.js"
import { transferGetEndpoint } from "../endpoint/transferGetEndpoint.js"
import { transferListEndpoint } from "../endpoint/transferListEndpoint.js"
import { transferPrepareEndpoint } from "../endpoint/transferPrepareEndpoint.js"
import { transferSetupGetEndpoint } from "../endpoint/transferSetupGetEndpoint.js"
import { transferStartEndpoint } from "../endpoint/transferStartEndpoint.js"
import { transferAuthCodeUpdate } from "./transferAuthCodeUpdate.js"
import { transferCancel } from "./transferCancel.js"
import { transferCreate } from "./transferCreate.js"
import { transferGet } from "./transferGet.js"
import { transferList } from "./transferList.js"
import { transferPrepare } from "./transferPrepare.js"
import { transferSetupGet } from "./transferSetupGet.js"
import { transferStart } from "./transferStart.js"

test("transferCreate builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferCreate(client, { domain: "example.com", authCode: "text", cost: 100 })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/transfer/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ authCode: "text", cost: 100, apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(transferCreateEndpoint.responseSchema, result.data).success).toBe(true)
})
test("transferSetupGet builds its GET request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferSetupGet(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/getTransferSetup/example.com")
  expect(calls[0]!.init?.method).toBe("GET")
  if (result.success) expect(a.safeParse(transferSetupGetEndpoint.responseSchema, result.data).success).toBe(true)
})
test("transferPrepare builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferPrepare(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/prepareTransfer/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(transferPrepareEndpoint.responseSchema, result.data).success).toBe(true)
})
test("transferStart builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferStart(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/startTransfer/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(transferStartEndpoint.responseSchema, result.data).success).toBe(true)
})
test("transferCancel builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferCancel(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/cancelTransfer/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(transferCancelEndpoint.responseSchema, result.data).success).toBe(true)
})
test("transferAuthCodeUpdate builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferAuthCodeUpdate(client, { domain: "example.com", authCode: "text" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/updateTransferAuthCode/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ authCode: "text", apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(transferAuthCodeUpdateEndpoint.responseSchema, result.data).success).toBe(true)
})
test("transferGet builds its GET request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferGet(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/getTransfer/example.com")
  expect(calls[0]!.init?.method).toBe("GET")
  if (result.success) expect(a.safeParse(transferGetEndpoint.responseSchema, result.data).success).toBe(true)
})
test("transferList builds its GET request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await transferList(client)
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/listTransfers")
  expect(calls[0]!.init?.method).toBe("GET")
  if (result.success) expect(a.safeParse(transferListEndpoint.responseSchema, result.data).success).toBe(true)
})

test("transferCreate parses purchase and dry-run previews and validates cents", async () => {
  const preview = {
    status: "SUCCESS",
    dryRun: true,
    wouldSucceed: true,
    operation: "transfer" as const,
    domain: "example.com",
    cost: 100,
  }
  const { client } = porkbunTestClient(preview)
  const result = await transferCreate(client, { domain: "example.com", authCode: "code", cost: 100, dryRun: true })
  expect(result).toEqual({ success: true, data: preview })
  expect(
    a.safeParse(transferCreateEndpoint.inputSchema, { domain: "example.com", authCode: "code", cost: -1 }).success,
  ).toBe(false)
  expect(
    a.safeParse(transferCreateEndpoint.responseSchema, {
      status: "SUCCESS",
      domain: "example.com",
      orderId: 123,
      transferId: 456,
      limits: { attempts: { TTL: 1, limit: 1 } },
    }).success,
  ).toBe(true)
})

test("transferGet and transferList reject unknown transfer statuses", () => {
  expect(
    a.safeParse(transferGetEndpoint.responseSchema, { status: "SUCCESS", transfer: { status: "UNKNOWN" } }).success,
  ).toBe(false)
  expect(
    a.safeParse(transferListEndpoint.responseSchema, { status: "SUCCESS", transfers: [{ status: "PENDINGAUTH" }] })
      .success,
  ).toBe(true)
})
