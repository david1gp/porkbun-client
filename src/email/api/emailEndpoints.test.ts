import { expect, test } from "bun:test"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { emailForwardCreateEndpoint } from "../endpoint/emailForwardCreateEndpoint.js"
import { emailForwardDeleteEndpoint } from "../endpoint/emailForwardDeleteEndpoint.js"
import { emailForwardListEndpoint } from "../endpoint/emailForwardListEndpoint.js"
import { emailMailboxCreateEndpoint } from "../endpoint/emailMailboxCreateEndpoint.js"
import { emailMailboxListEndpoint } from "../endpoint/emailMailboxListEndpoint.js"
import { emailMailboxRenewEndpoint } from "../endpoint/emailMailboxRenewEndpoint.js"
import { emailMailboxSetupEndpoint } from "../endpoint/emailMailboxSetupEndpoint.js"
import { emailPasswordSetEndpoint } from "../endpoint/emailPasswordSetEndpoint.js"

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
  test(`${endpoint.op} builds the documented request`, async () => {
    const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
    await porkbunEndpointCall(client, endpoint, input)
    expect(calls.length).toBe(1)
    expect(calls[0]!.init?.method).toBe(endpoint.method)
    let expected = endpoint.path
    for (const [key, value] of Object.entries(input))
      expected = expected.replace(`{${key}}`, encodeURIComponent(String(value)))
    expect(new URL(calls[0]!.url).pathname).toBe(`/api/json/v3${expected}`)
  })
}
