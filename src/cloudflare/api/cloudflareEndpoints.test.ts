import { expect, test } from "bun:test"
import * as a from "valibot"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
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

// Static fixtures resolved from OpenAPI request properties and response property
// examples (with typed placeholders for fields without examples). Cloudflare's
// unspecified response objects intentionally produce {} here, as does its mock.
const cases = [
  {
    endpoint: cloudflareConnectEndpoint,
    input: {
      domains: ["example.com", "example.net"],
      dryRun: true,
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/connect",
    body: {
      domains: ["example.com", "example.net"],
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareConnectionGetEndpoint,
    input: {},
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/getConnection",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareDisconnectEndpoint,
    input: {
      dryRun: true,
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/disconnect",
    body: {
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareInventoryListEndpoint,
    input: {},
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/inventory",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareMoveGetEndpoint,
    input: {
      domain: "example.com",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/get/example.com",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareMovePreviewEndpoint,
    input: {
      domain: "example.com",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/preview/example.com",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareMoveRetryEndpoint,
    input: {
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/retry/example.com",
    body: {
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareMoveRollbackEndpoint,
    input: {
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/rollback/example.com",
    body: {
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareProxySetEndpoint,
    input: {
      enabled: true,
      records: ["@", "www"],
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/setProxy/example.com",
    body: {
      enabled: true,
      records: ["@", "www"],
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareQueueListEndpoint,
    input: {},
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/getQueue",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareRecordCreateEndpoint,
    input: {
      type: "TXT",
      name: "www",
      content: "192.0.2.1",
      ttl: 1,
      priority: 10,
      proxied: true,
      comment: "sample",
      data: {},
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/createRecord/example.com",
    body: {
      type: "TXT",
      name: "www",
      content: "192.0.2.1",
      ttl: 1,
      priority: 10,
      proxied: true,
      comment: "sample",
      data: {},
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareRecordDeleteEndpoint,
    input: {
      dryRun: true,
      domain: "example.com",
      recordId: "record/1",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/deleteRecord/example.com/record%2F1",
    body: {
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareRecordEditEndpoint,
    input: {
      type: "TXT",
      name: "www",
      content: "192.0.2.1",
      ttl: 1,
      priority: 10,
      proxied: true,
      comment: "sample",
      data: {},
      dryRun: true,
      domain: "example.com",
      recordId: "record/1",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/editRecord/example.com/record%2F1",
    body: {
      type: "TXT",
      name: "www",
      content: "192.0.2.1",
      ttl: 1,
      priority: 10,
      proxied: true,
      comment: "sample",
      data: {},
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
  {
    endpoint: cloudflareRecordListEndpoint,
    input: {
      domain: "example.com",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/getRecords/example.com",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareZoneGetEndpoint,
    input: {
      domain: "example.com",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/getZone/example.com",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareZoneSettingsGetEndpoint,
    input: {
      domain: "example.com",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/getZoneSettings/example.com",
    body: undefined,
    response: {},
  },
  {
    endpoint: cloudflareZoneSettingsSetEndpoint,
    input: {
      ssl: "off",
      always_use_https: "on",
      automatic_https_rewrites: "on",
      min_tls_version: "1.0",
      development_mode: "on",
      cache_level: "aggressive",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/cloudflare/setZoneSettings/example.com",
    body: {
      ssl: "off",
      always_use_https: "on",
      automatic_https_rewrites: "on",
      min_tls_version: "1.0",
      development_mode: "on",
      cache_level: "aggressive",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {},
  },
] as const

for (const row of cases) {
  test(`${row.endpoint.op} serializes the entire payload and parses the spec example shape`, async () => {
    const endpoint: PorkbunEndpoint = row.endpoint
    const { client, calls } = porkbunTestClient(row.response)
    const result = await porkbunEndpointCall(client, endpoint, row.input)
    expect(result.success).toBe(true)
    expect(calls).toHaveLength(1)
    expect(calls[0]!.url).toBe(row.url)
    expect(calls[0]!.init?.method).toBe(row.method)
    expect(calls[0]!.body).toEqual(row.body)
    if (endpoint.method === "GET") {
      expect(calls[0]!.init?.body).toBeUndefined()
      expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
      expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
    }
    expect(a.safeParse(endpoint.responseSchema, row.response).success).toBe(true)
  })
}
