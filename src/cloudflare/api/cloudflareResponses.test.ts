import { expect, test } from "bun:test"
import * as a from "valibot"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { cloudflareConnectEndpoint } from "../endpoint/cloudflareConnectEndpoint.js"
import { cloudflareProxySetEndpoint } from "../endpoint/cloudflareProxySetEndpoint.js"
import { cloudflareRecordCreateEndpoint } from "../endpoint/cloudflareRecordCreateEndpoint.js"
import { cloudflareRecordDeleteEndpoint } from "../endpoint/cloudflareRecordDeleteEndpoint.js"
import { cloudflareRecordEditEndpoint } from "../endpoint/cloudflareRecordEditEndpoint.js"
import { cloudflareZoneSettingsSetEndpoint } from "../endpoint/cloudflareZoneSettingsSetEndpoint.js"

const record = { id: "rec1", type: "A", name: "example.com", content: "192.0.2.1", ttl: 1, proxied: false }
// Prose/MCP-derived fixtures: the live mock is {}, not a preview example.
const cases: { endpoint: PorkbunEndpoint; preview: Record<string, unknown> }[] = [
  {
    endpoint: cloudflareConnectEndpoint,
    preview: { queued: { "example.com": { reason: "eligible" } }, skipped: [], alreadyQueued: {} },
  },
  {
    endpoint: cloudflareProxySetEndpoint,
    preview: { applied: [record], skipped: [{ ...record, reason: "already set" }], warnings: [] },
  },
  {
    endpoint: cloudflareZoneSettingsSetEndpoint,
    preview: { applied: { ssl: "full" }, failed: {}, settings: { ssl: "flexible" } },
  },
  { endpoint: cloudflareRecordCreateEndpoint, preview: { record } },
  { endpoint: cloudflareRecordEditEndpoint, preview: { record: { ...record, proxied: true }, previous: record } },
  { endpoint: cloudflareRecordDeleteEndpoint, preview: { record } },
]
for (const { endpoint, preview } of cases) {
  test(`${endpoint.op} models the no-write preview separately from the real result`, () => {
    const response = { status: "SUCCESS", dryRun: true, wouldSucceed: true, ...preview }
    expect(a.safeParse(endpoint.responseSchema, response).success).toBe(true)
    expect(a.safeParse(endpoint.responseSchema, { ...response, dryRun: "true" }).success).toBe(false)
    expect(a.safeParse(endpoint.responseSchema, { ...response, wouldSucceed: "yes" }).success).toBe(false)
    expect(a.safeParse(endpoint.responseSchema, { status: "SUCCESS", ...preview }).success).toBe(true)
    // Deliberate mock discrepancy: no documented fields are present upstream.
    expect(a.safeParse(endpoint.responseSchema, {}).success).toBe(true)
  })
}
