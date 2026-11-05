import { expect, test } from "bun:test"
import * as a from "valibot"
import { glueCreate } from "../src/glue/api/glueCreate.js"
import { glueDelete } from "../src/glue/api/glueDelete.js"
import { glueList } from "../src/glue/api/glueList.js"
import { glueUpdate } from "../src/glue/api/glueUpdate.js"
import { glueCreateEndpoint } from "../src/glue/endpoint/glueCreateEndpoint.js"
import { glueDeleteEndpoint } from "../src/glue/endpoint/glueDeleteEndpoint.js"
import { glueListEndpoint } from "../src/glue/endpoint/glueListEndpoint.js"
import { glueUpdateEndpoint } from "../src/glue/endpoint/glueUpdateEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

const created = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl, apiKey: "pk1_mock", secretApiKey: "sk1_mock" })
if (!created.success) throw new Error(created.errorMessage)
const client = created.data
test("live mock validates glueList", async () => {
  const result = await glueList(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(glueListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates glueCreate", async () => {
  const result = await glueCreate(
    client,
    { domain: "example.com", subdomain: "ns1", ips: ["1.2.3.4", "2001:db8::1"] },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(glueCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates glueUpdate", async () => {
  const result = await glueUpdate(
    client,
    { domain: "example.com", subdomain: "ns1", ips: ["1.2.3.4", "2001:db8::1"] },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(glueUpdateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("live mock validates glueDelete", async () => {
  const result = await glueDelete(
    client,
    { domain: "example.com", subdomain: "ns1" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(glueDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
