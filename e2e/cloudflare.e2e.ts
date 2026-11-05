import { expect, test } from "bun:test"
import * as a from "valibot"
import { cloudflareConnectEndpoint } from "../src/cloudflare/endpoint/cloudflareConnectEndpoint.js"
import { cloudflareConnectionGetEndpoint } from "../src/cloudflare/endpoint/cloudflareConnectionGetEndpoint.js"
import { cloudflareDisconnectEndpoint } from "../src/cloudflare/endpoint/cloudflareDisconnectEndpoint.js"
import { cloudflareInventoryListEndpoint } from "../src/cloudflare/endpoint/cloudflareInventoryListEndpoint.js"
import { cloudflareMoveGetEndpoint } from "../src/cloudflare/endpoint/cloudflareMoveGetEndpoint.js"
import { cloudflareMovePreviewEndpoint } from "../src/cloudflare/endpoint/cloudflareMovePreviewEndpoint.js"
import { cloudflareMoveRetryEndpoint } from "../src/cloudflare/endpoint/cloudflareMoveRetryEndpoint.js"
import { cloudflareMoveRollbackEndpoint } from "../src/cloudflare/endpoint/cloudflareMoveRollbackEndpoint.js"
import { cloudflareProxySetEndpoint } from "../src/cloudflare/endpoint/cloudflareProxySetEndpoint.js"
import { cloudflareQueueListEndpoint } from "../src/cloudflare/endpoint/cloudflareQueueListEndpoint.js"
import { cloudflareRecordCreateEndpoint } from "../src/cloudflare/endpoint/cloudflareRecordCreateEndpoint.js"
import { cloudflareRecordDeleteEndpoint } from "../src/cloudflare/endpoint/cloudflareRecordDeleteEndpoint.js"
import { cloudflareRecordEditEndpoint } from "../src/cloudflare/endpoint/cloudflareRecordEditEndpoint.js"
import { cloudflareRecordListEndpoint } from "../src/cloudflare/endpoint/cloudflareRecordListEndpoint.js"
import { cloudflareZoneGetEndpoint } from "../src/cloudflare/endpoint/cloudflareZoneGetEndpoint.js"
import { cloudflareZoneSettingsGetEndpoint } from "../src/cloudflare/endpoint/cloudflareZoneSettingsGetEndpoint.js"
import { cloudflareZoneSettingsSetEndpoint } from "../src/cloudflare/endpoint/cloudflareZoneSettingsSetEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

const retryFetch: typeof fetch = async (input, init) => {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(input, init)
    if (attempt >= 4 || ![429, 502, 503, 504].includes(response.status)) return response
    await response.body?.cancel()
    await Bun.sleep(250 * 2 ** attempt)
  }
}
const result = porkbunClientCreate({
  baseUrl: porkbunMockBaseUrl,
  apiKey: "pk1_mock",
  secretApiKey: "sk1_mock",
  fetch: retryFetch,
})
if (!result.success) throw new Error(result.errorMessage)
const client = result.data
test("mock cloudflareConnectEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareConnectEndpoint,
    { domains: ["example.com"] },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareConnectEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareConnectionGetEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareConnectionGetEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(cloudflareConnectionGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareDisconnectEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareDisconnectEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareDisconnectEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareInventoryListEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareInventoryListEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(cloudflareInventoryListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareMoveGetEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareMoveGetEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareMoveGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareMovePreviewEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareMovePreviewEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareMovePreviewEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareMoveRetryEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareMoveRetryEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareMoveRetryEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareMoveRollbackEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareMoveRollbackEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareMoveRollbackEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareProxySetEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareProxySetEndpoint,
    { domain: "example.com", enabled: true },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareProxySetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareQueueListEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareQueueListEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareQueueListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareRecordCreateEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareRecordCreateEndpoint,
    { domain: "example.com", type: "A" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareRecordCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareRecordDeleteEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareRecordDeleteEndpoint,
    { domain: "example.com", recordId: "rec/1" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareRecordDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareRecordEditEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareRecordEditEndpoint,
    { domain: "example.com", recordId: "rec/1" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareRecordEditEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareRecordListEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareRecordListEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareRecordListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareZoneGetEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareZoneGetEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(cloudflareZoneGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareZoneSettingsGetEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareZoneSettingsGetEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(cloudflareZoneSettingsGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock cloudflareZoneSettingsSetEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    cloudflareZoneSettingsSetEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(cloudflareZoneSettingsSetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
