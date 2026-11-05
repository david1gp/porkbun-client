import { expect, test } from "bun:test"
import * as a from "valibot"
import { apiKeyRequestEndpoint } from "../src/apiKey/endpoint/apiKeyRequestEndpoint.js"
import { apiKeyRetrieveEndpoint } from "../src/apiKey/endpoint/apiKeyRetrieveEndpoint.js"
import { apiKeyRevokeEndpoint } from "../src/apiKey/endpoint/apiKeyRevokeEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

const clientResult = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl, apiKey: "pk1_mock", secretApiKey: "sk1_mock" })
if (!clientResult.success) throw new Error(clientResult.errorMessage)
const client = clientResult.data

test("mock apiKeyRequest returns a valid response", async () => {
  const result = await porkbunEndpointCall(client, apiKeyRequestEndpoint, {}, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(apiKeyRequestEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock apiKeyRetrieve returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    apiKeyRetrieveEndpoint,
    { requestToken: "test" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(apiKeyRetrieveEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock apiKeyRevoke returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    apiKeyRevokeEndpoint,
    { confirm: "revoke" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(apiKeyRevokeEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
