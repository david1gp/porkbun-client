import { expect, test } from "bun:test"
import * as a from "valibot"
import { sslBundleGet } from "../src/ssl/api/sslBundleGet.js"
import { sslBundleGetEndpoint } from "../src/ssl/endpoint/sslBundleGetEndpoint.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const result = porkbunE2eClientCreate()
if (!result.success) throw new Error(result.errorMessage)
const client = result.data
test("live mock: sslBundleGet", async () => {
  const result = await sslBundleGet(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(sslBundleGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
