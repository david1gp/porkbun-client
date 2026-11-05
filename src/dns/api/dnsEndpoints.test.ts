import { expect, test } from "bun:test"
import * as a from "valibot"
import { dnssecRecordCreateEndpoint } from "../../dnssec/endpoint/dnssecRecordCreateEndpoint.js"
import { dnssecRecordDeleteEndpoint } from "../../dnssec/endpoint/dnssecRecordDeleteEndpoint.js"
import { dnssecRecordListEndpoint } from "../../dnssec/endpoint/dnssecRecordListEndpoint.js"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { sslBundleGetEndpoint } from "../../ssl/endpoint/sslBundleGetEndpoint.js"
import { dnsHistoryDiffEndpoint } from "../endpoint/dnsHistoryDiffEndpoint.js"
import { dnsHistoryListEndpoint } from "../endpoint/dnsHistoryListEndpoint.js"
import { dnsHistoryRestoreEndpoint } from "../endpoint/dnsHistoryRestoreEndpoint.js"
import { dnsImportEndpoint } from "../endpoint/dnsImportEndpoint.js"
import { dnsPreflightEndpoint } from "../endpoint/dnsPreflightEndpoint.js"
import { dnsRecordCreateEndpoint } from "../endpoint/dnsRecordCreateEndpoint.js"
import { dnsRecordDeleteByNameTypeEndpoint } from "../endpoint/dnsRecordDeleteByNameTypeEndpoint.js"
import { dnsRecordDeleteEndpoint } from "../endpoint/dnsRecordDeleteEndpoint.js"
import { dnsRecordEditByNameTypeEndpoint } from "../endpoint/dnsRecordEditByNameTypeEndpoint.js"
import { dnsRecordEditEndpoint } from "../endpoint/dnsRecordEditEndpoint.js"
import { dnsRecordGetEndpoint } from "../endpoint/dnsRecordGetEndpoint.js"
import { dnsRecordListByNameTypeEndpoint } from "../endpoint/dnsRecordListByNameTypeEndpoint.js"
import { dnsRecordListEndpoint } from "../endpoint/dnsRecordListEndpoint.js"
import { dnsScanEndpoint } from "../endpoint/dnsScanEndpoint.js"

// Values from the v3.73 component examples. Retrieve and history intentionally
// differ in TTL/priority representation; accidentally broadening either is a bug.
const record = {
  id: "123456789",
  name: "www.example.com",
  type: "A",
  content: "1.2.3.4",
  ttl: "600",
  prio: null,
  notes: null,
}
const historyRecord = { name: "www.example.com", type: "A", content: "203.0.113.10", ttl: 600, prio: null }
const records = { status: "SUCCESS", cloudflare: "disabled", records: [record] }
const basic = { status: "SUCCESS", warnings: ["Advisory: delegation is external."] }
const bundle = {
  status: "SUCCESS",
  certificatechain: "-----BEGIN CERTIFICATE-----\nchain\n-----END CERTIFICATE-----",
  privatekey: "-----BEGIN PRIVATE KEY-----\nsecret\n-----END PRIVATE KEY-----",
  publickey: "-----BEGIN PUBLIC KEY-----\npublic\n-----END PUBLIC KEY-----",
}
const cases: {
  endpoint: PorkbunEndpoint
  input: Record<string, unknown>
  path: string
  method: "GET" | "POST"
  payload: Record<string, unknown>
  response: unknown
}[] = [
  {
    endpoint: dnsRecordListEndpoint,
    input: { domain: "example.com", ...{} },
    path: "/dns/retrieve/example.com",
    method: "POST",
    payload: {},
    response: records,
  },
  {
    endpoint: dnsRecordGetEndpoint,
    input: { domain: "example.com", ...{ id: "123/456" } },
    path: "/dns/retrieve/example.com/123%2F456",
    method: "POST",
    payload: {},
    response: records,
  },
  {
    endpoint: dnsRecordListByNameTypeEndpoint,
    input: { domain: "example.com", ...{ type: "A", subdomain: "www/a b" } },
    path: "/dns/retrieveByNameType/example.com/A/www%2Fa%20b",
    method: "POST",
    payload: {},
    response: records,
  },
  {
    endpoint: dnsRecordCreateEndpoint,
    input: {
      domain: "example.com",
      ...{ name: "www", type: "A", content: "1.2.3.4", ttl: 600, prio: 10, notes: "test" },
    },
    path: "/dns/create/example.com",
    method: "POST",
    payload: { name: "www", type: "A", content: "1.2.3.4", ttl: 600, prio: 10, notes: "test" },
    response: { status: "SUCCESS", id: 123456789, warnings: basic.warnings },
  },
  {
    endpoint: dnsRecordEditEndpoint,
    input: {
      domain: "example.com",
      ...{ id: "123/456", name: "", type: "MX", content: "mail.example.com", ttl: 600, prio: 10, notes: "" },
    },
    path: "/dns/edit/example.com/123%2F456",
    method: "POST",
    payload: { name: "", type: "MX", content: "mail.example.com", ttl: 600, prio: 10, notes: "" },
    response: basic,
  },
  {
    endpoint: dnsRecordEditByNameTypeEndpoint,
    input: {
      domain: "example.com",
      ...{ type: "A", subdomain: "www", content: "5.6.7.8", ttl: 600, prio: 0, notes: "test" },
    },
    path: "/dns/editByNameType/example.com/A/www",
    method: "POST",
    payload: { content: "5.6.7.8", ttl: 600, prio: 0, notes: "test" },
    response: basic,
  },
  {
    endpoint: dnsRecordDeleteEndpoint,
    input: { domain: "example.com", ...{ id: "123/456" } },
    path: "/dns/delete/example.com/123%2F456",
    method: "POST",
    payload: {},
    response: basic,
  },
  {
    endpoint: dnsRecordDeleteByNameTypeEndpoint,
    input: { domain: "example.com", ...{ type: "A", subdomain: "www" } },
    path: "/dns/deleteByNameType/example.com/A/www",
    method: "POST",
    payload: {},
    response: basic,
  },
  {
    endpoint: dnsPreflightEndpoint,
    input: { domain: "example.com", ...{ intent: "move-nameservers" } },
    path: "/dns/preflight/example.com?intent=move-nameservers",
    method: "GET",
    payload: {},
    response: {
      status: "SUCCESS",
      domain: "example.com",
      intent: "move-nameservers",
      safe: false,
      blockers: ["dnssec-active"],
      warnings: [],
      checks: [
        {
          id: "dnssec-active",
          severity: "blocker",
          ok: false,
          title: "DS records published",
          detail: "DS records do not match new nameservers",
          next_action: "Remove DNSSEC first",
        },
      ],
    },
  },
  {
    endpoint: dnsHistoryListEndpoint,
    input: { domain: "example.com", ...{} },
    path: "/dns/history/example.com",
    method: "GET",
    payload: {},
    response: {
      status: "SUCCESS",
      domain: "example.com",
      restorePoints: [
        {
          id: 1234,
          takenAt: "2026-09-16 22:14:19",
          reason: "before-edit",
          source: "auto",
          recordCount: 9,
          matchesLive: false,
        },
      ],
    },
  },
  {
    endpoint: dnsHistoryDiffEndpoint,
    input: { domain: "example.com", ...{ snapshotId: 1234 } },
    path: "/dns/diff/example.com/1234",
    method: "GET",
    payload: {},
    response: {
      status: "SUCCESS",
      domain: "example.com",
      snapshot: { id: 1234, takenAt: "2026-09-16 22:14:19", reason: "before-edit" },
      missing: [historyRecord],
      extra: [],
      inSync: false,
    },
  },
  {
    endpoint: dnsHistoryRestoreEndpoint,
    input: { domain: "example.com", ...{ snapshotId: 1234, prune: true } },
    path: "/dns/restore/example.com",
    method: "POST",
    payload: { snapshotId: 1234, prune: true },
    response: {
      status: "SUCCESS",
      warnings: basic.warnings,
      domain: "example.com",
      restoredFrom: 1234,
      previousStateSavedAs: 1240,
      restored: 2,
      removed: 0,
      failed: [{ name: "example.com", type: "ALIAS", reason: "Managed elsewhere" }],
    },
  },
  {
    endpoint: dnsScanEndpoint,
    input: { domain: "example.com", ...{} },
    path: "/dns/scan/example.com",
    method: "GET",
    payload: {},
    response: { status: "SUCCESS", domain: "example.com", recordCount: 1, records: [historyRecord] },
  },
  {
    endpoint: dnsImportEndpoint,
    input: { domain: "example.com", ...{ records: [{ ...historyRecord, type: "SOA" }] } },
    path: "/dns/import/example.com",
    method: "POST",
    payload: { records: [{ ...historyRecord, type: "SOA" }] },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      created: 1,
      skipped: 0,
      failed: 0,
      failures: [],
      warnings: basic.warnings,
    },
  },
  {
    endpoint: dnssecRecordListEndpoint,
    input: { domain: "example.com", ...{} },
    path: "/dns/getDnssecRecords/example.com",
    method: "POST",
    payload: {},
    response: {
      status: "SUCCESS",
      records: { "12345": { keyTag: "12345", alg: "13", digestType: "2", digest: "ABCD1234...", pubKey: "BASE64" } },
    },
  },
  {
    endpoint: dnssecRecordCreateEndpoint,
    input: {
      domain: "example.com",
      ...{
        keyTag: "12345",
        alg: "13",
        digestType: "2",
        digest: "ABCD1234...",
        maxSigLife: "3600",
        keyDataFlags: "257",
        keyDataProtocol: "3",
        keyDataAlgo: "13",
        keyDataPubKey: "BASE64",
      },
    },
    path: "/dns/createDnssecRecord/example.com",
    method: "POST",
    payload: {
      keyTag: "12345",
      alg: "13",
      digestType: "2",
      digest: "ABCD1234...",
      maxSigLife: "3600",
      keyDataFlags: "257",
      keyDataProtocol: "3",
      keyDataAlgo: "13",
      keyDataPubKey: "BASE64",
    },
    response: basic,
  },
  {
    endpoint: dnssecRecordDeleteEndpoint,
    input: { domain: "example.com", ...{ keytag: "123/45" } },
    path: "/dns/deleteDnssecRecord/example.com/123%2F45",
    method: "POST",
    payload: {},
    response: basic,
  },
  {
    endpoint: sslBundleGetEndpoint,
    input: { domain: "example.com", ...{} },
    path: "/ssl/retrieve/example.com",
    method: "POST",
    payload: {},
    response: bundle,
  },
]
for (const row of cases) {
  test(`${row.endpoint.op}: builds full authenticated ${row.method} request and parses documented response fields`, async () => {
    const { client, calls } = porkbunTestClient(row.response)
    const result = await porkbunEndpointCall(client, row.endpoint, row.input)
    expect(result).toEqual({ success: true, data: row.response })
    expect(calls).toHaveLength(1)
    expect(calls[0]?.url).toBe(`https://api.porkbun.com/api/json/v3${row.path}`)
    expect(calls[0]?.init?.method).toBe(row.method)
    if (row.method === "GET") {
      expect(calls[0]?.body).toBeUndefined()
      expect(calls[0]?.headers.get("X-API-Key")).toBe("pk1_test")
      expect(calls[0]?.headers.get("X-Secret-API-Key")).toBe("sk1_test")
    } else {
      expect(calls[0]?.body).toEqual({ ...row.payload, apikey: "pk1_test", secretapikey: "sk1_test" })
      expect(calls[0]?.headers.get("X-API-Key")).toBeNull()
      expect(calls[0]?.headers.get("Content-Type")).toBe("application/json")
    }
  })
}

for (const row of cases.filter(({ endpoint }) => endpoint.op.includes("ByNameType"))) {
  for (const subdomain of [undefined, ""] as const) {
    test(`${row.endpoint.op}: apex ${JSON.stringify(subdomain)} omits trailing slash and payload field`, async () => {
      const { client, calls } = porkbunTestClient(row.response)
      const result = await porkbunEndpointCall(client, row.endpoint, { ...row.input, subdomain })
      expect(result.success).toBe(true)
      expect(calls[0]?.url).toBe(`https://api.porkbun.com/api/json/v3${row.path.split("/A/")[0]}/A`)
      expect(calls[0]?.body).toEqual({ ...row.payload, apikey: "pk1_test", secretapikey: "sk1_test" })
    })
  }
}

// The v3.73 prose documents these previews, but omits their 200 oneOf schemas.
for (const row of cases.filter(({ endpoint }) => "dryRun" in endpoint.inputSchema.entries)) {
  test(`${row.endpoint.op}: dry-run uses DNS preview union, never the paid domain-cost preview`, async () => {
    const preview = { status: "SUCCESS", dryRun: true, wouldSucceed: true, domain: "example.com" }
    const { client, calls } = porkbunTestClient(preview)
    const result = await porkbunEndpointCall(client, row.endpoint, { ...row.input, dryRun: true })
    expect(result).toEqual({ success: true, data: preview })
    expect(calls[0]?.body).toEqual({ ...row.payload, dryRun: true, apikey: "pk1_test", secretapikey: "sk1_test" })
    expect(a.safeParse(row.endpoint.responseSchema, { ...preview, wouldSucceed: "yes" }).success).toBe(false)
    expect(a.safeParse(row.endpoint.responseSchema, { status: "SUCCESS", dryRun: true }).success).toBe(false)
    expect(a.safeParse(row.endpoint.responseSchema, { ...preview, wouldSucceed: false }).success).toBe(true)
  })
}

for (const [endpoint, invalid] of [
  [dnsRecordListEndpoint, { ...records, records: [{ ...record, ttl: 600 }] }],
  [dnsRecordGetEndpoint, { status: "SUCCESS" }],
  [dnsRecordListByNameTypeEndpoint, { ...records, cloudflare: "unknown" }],
  [dnsHistoryDiffEndpoint, { missing: [{ ...historyRecord, ttl: "600" }] }],
  [dnsHistoryListEndpoint, { restorePoints: [{ recordCount: 1.5 }] }],
  [dnsHistoryRestoreEndpoint, { failed: [{ reason: 3 }] }],
  [dnsPreflightEndpoint, { checks: [{ severity: "critical" }] }],
  [dnsScanEndpoint, { records: [{ ...historyRecord, prio: "10" }] }],
  [dnsImportEndpoint, { created: "1" }],
  [dnssecRecordListEndpoint, { records: { "12345": { alg: 13 } } }],
  [sslBundleGetEndpoint, { privatekey: 123 }],
] as const) {
  test(`${endpoint.op}: rejects malformed documented response fields`, async () => {
    expect(a.safeParse(endpoint.responseSchema, invalid).success).toBe(false)
  })
}

test("import accepts null priority and arbitrary type, while create/edit preserve their stricter contracts", () => {
  expect(
    a.safeParse(dnsImportEndpoint.inputSchema, { domain: "example.com", records: [{ type: "SOA", prio: null }] })
      .success,
  ).toBe(true)
  expect(
    a.safeParse(dnsImportEndpoint.inputSchema, {
      domain: "example.com",
      records: Array.from({ length: 501 }, () => ({})),
    }).success,
  ).toBe(false)
  expect(
    a.safeParse(dnsRecordCreateEndpoint.inputSchema, { domain: "example.com", type: "SOA", content: "value" }).success,
  ).toBe(false)
  expect(a.safeParse(dnsRecordCreateEndpoint.inputSchema, { domain: "example.com", type: "A" }).success).toBe(false)
  expect(a.safeParse(dnsRecordEditEndpoint.inputSchema, { domain: "example.com", id: "123", prio: null }).success).toBe(
    false,
  )
})
