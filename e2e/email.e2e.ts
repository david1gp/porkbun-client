import { expect, test } from "bun:test"
import { emailForwardCreateEndpoint } from "../src/email/endpoint/emailForwardCreateEndpoint.js"
import { emailForwardDeleteEndpoint } from "../src/email/endpoint/emailForwardDeleteEndpoint.js"
import { emailForwardListEndpoint } from "../src/email/endpoint/emailForwardListEndpoint.js"
import { emailMailboxCreateEndpoint } from "../src/email/endpoint/emailMailboxCreateEndpoint.js"
import { emailMailboxListEndpoint } from "../src/email/endpoint/emailMailboxListEndpoint.js"
import { emailMailboxRenewEndpoint } from "../src/email/endpoint/emailMailboxRenewEndpoint.js"
import { emailMailboxSetupEndpoint } from "../src/email/endpoint/emailMailboxSetupEndpoint.js"
import { emailPasswordSetEndpoint } from "../src/email/endpoint/emailPasswordSetEndpoint.js"
import type { PorkbunEndpoint } from "../src/shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const cases: { endpoint: PorkbunEndpoint; input: Record<string, unknown> }[] = [
  { endpoint: emailForwardListEndpoint, input: { domain: "example.com" } },
  {
    endpoint: emailForwardCreateEndpoint,
    input: { domain: "example.com", address: "info", forwardTo: "test@example.net", dryRun: true },
  },
  {
    endpoint: emailForwardDeleteEndpoint,
    input: { domain: "example.com", address: "info", forwardTo: "test@example.net" },
  },
  { endpoint: emailMailboxListEndpoint, input: { domain: "example.com" } },
  { endpoint: emailMailboxSetupEndpoint, input: { domain: "example.com", address: "me" } },
  {
    endpoint: emailMailboxCreateEndpoint,
    input: { domain: "example.com", address: "me", cost: 0, agreeToTerms: "yes", dryRun: true },
  },
  { endpoint: emailMailboxRenewEndpoint, input: { domain: "example.com", cost: 0, agreeToTerms: "yes" } },
  { endpoint: emailPasswordSetEndpoint, input: { emailAddress: "me@example.com", password: "Password123!" } },
]
for (const { endpoint, input } of cases) {
  test(`live mock validates ${endpoint.op}`, async () => {
    const client = porkbunE2eClientCreate()
    if (!client.success) throw new Error(client.errorMessage)
    const result = await porkbunEndpointCall(client.data, endpoint, input, { signal: AbortSignal.timeout(30000) })
    if (!result.success) console.error(endpoint.op, result)
    expect(result.success).toBe(true)
  }, 35000)
}
