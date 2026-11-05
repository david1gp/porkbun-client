import { expect, test } from "bun:test"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { apiKeyRequestEndpoint } from "../endpoint/apiKeyRequestEndpoint.js"
import { apiKeyRetrieveEndpoint } from "../endpoint/apiKeyRetrieveEndpoint.js"
import { apiKeyRevokeEndpoint } from "../endpoint/apiKeyRevokeEndpoint.js"

test("apiKeyRequest builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ requestToken: "test", status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, apiKeyRequestEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/apikey/request")
})

test("apiKeyRetrieve builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, apiKeyRetrieveEndpoint, { requestToken: "test" })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/apikey/retrieve")
})

test("apiKeyRevoke builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, apiKeyRevokeEndpoint, { confirm: "revoke" })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/apikey/revoke")
})
