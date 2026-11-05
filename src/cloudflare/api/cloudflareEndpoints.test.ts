import { expect, test } from "bun:test"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { cloudflareConnectEndpoint } from "../endpoint/cloudflareConnectEndpoint.js"
import { cloudflareConnectionGetEndpoint } from "../endpoint/cloudflareConnectionGetEndpoint.js"
import { cloudflareDisconnectEndpoint } from "../endpoint/cloudflareDisconnectEndpoint.js"
import { cloudflareInventoryListEndpoint } from "../endpoint/cloudflareInventoryListEndpoint.js"
import { cloudflareMoveGetEndpoint } from "../endpoint/cloudflareMoveGetEndpoint.js"
import { cloudflareMovePreviewEndpoint } from "../endpoint/cloudflareMovePreviewEndpoint.js"
import { cloudflareMoveRetryEndpoint } from "../endpoint/cloudflareMoveRetryEndpoint.js"
import { cloudflareMoveRollbackEndpoint } from "../endpoint/cloudflareMoveRollbackEndpoint.js"
import { cloudflareProxySetEndpoint } from "../endpoint/cloudflareProxySetEndpoint.js"
import { cloudflareQueueListEndpoint } from "../endpoint/cloudflareQueueListEndpoint.js"
import { cloudflareRecordCreateEndpoint } from "../endpoint/cloudflareRecordCreateEndpoint.js"
import { cloudflareRecordDeleteEndpoint } from "../endpoint/cloudflareRecordDeleteEndpoint.js"
import { cloudflareRecordEditEndpoint } from "../endpoint/cloudflareRecordEditEndpoint.js"
import { cloudflareRecordListEndpoint } from "../endpoint/cloudflareRecordListEndpoint.js"
import { cloudflareZoneGetEndpoint } from "../endpoint/cloudflareZoneGetEndpoint.js"
import { cloudflareZoneSettingsGetEndpoint } from "../endpoint/cloudflareZoneSettingsGetEndpoint.js"
import { cloudflareZoneSettingsSetEndpoint } from "../endpoint/cloudflareZoneSettingsSetEndpoint.js"

test("cloudflareConnectEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareConnectEndpoint, { domains: ["example.com"] })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/connect")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareConnectionGetEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareConnectionGetEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/getConnection")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareDisconnectEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareDisconnectEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/disconnect")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareInventoryListEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareInventoryListEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/inventory")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareMoveGetEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareMoveGetEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/get/example.com")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareMovePreviewEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareMovePreviewEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/preview/example.com")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareMoveRetryEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareMoveRetryEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/retry/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareMoveRollbackEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareMoveRollbackEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/rollback/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareProxySetEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareProxySetEndpoint, { domain: "example.com", enabled: true })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/setProxy/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareQueueListEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareQueueListEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/getQueue")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareRecordCreateEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareRecordCreateEndpoint, { domain: "example.com", type: "A" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/createRecord/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareRecordDeleteEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareRecordDeleteEndpoint, {
    domain: "example.com",
    recordId: "rec/1",
  })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/deleteRecord/example.com/rec%2F1")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareRecordEditEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareRecordEditEndpoint, {
    domain: "example.com",
    recordId: "rec/1",
  })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/editRecord/example.com/rec%2F1")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("cloudflareRecordListEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareRecordListEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/getRecords/example.com")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareZoneGetEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareZoneGetEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/getZone/example.com")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareZoneSettingsGetEndpoint builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareZoneSettingsGetEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/getZoneSettings/example.com")
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
  expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
})
test("cloudflareZoneSettingsSetEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, cloudflareZoneSettingsSetEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/cloudflare/setZoneSettings/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
