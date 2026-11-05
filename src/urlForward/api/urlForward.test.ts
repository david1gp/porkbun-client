import { expect, test } from "bun:test"
import * as a from "valibot"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { urlForwardCreateEndpoint } from "../endpoint/urlForwardCreateEndpoint.js"
import { urlForwardDeleteEndpoint } from "../endpoint/urlForwardDeleteEndpoint.js"
import { urlForwardListEndpoint } from "../endpoint/urlForwardListEndpoint.js"
import { urlForwardCreate } from "./urlForwardCreate.js"
import { urlForwardDelete } from "./urlForwardDelete.js"
import { urlForwardList } from "./urlForwardList.js"

test("urlForwardList builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", forwards: [] })
  const result = await urlForwardList(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/getUrlForwarding/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(urlForwardListEndpoint.responseSchema, result.data).success).toBe(true)
})
test("urlForwardCreate builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await urlForwardCreate(client, {
    domain: "example.com",
    location: "https://destination.example.com",
    type: "temporary",
    includePath: "yes",
    wildcard: "yes",
  })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/addUrlForward/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({
    location: "https://destination.example.com",
    type: "temporary",
    includePath: "yes",
    wildcard: "yes",
    apikey: "pk1_test",
    secretapikey: "sk1_test",
  })
  if (result.success) expect(a.safeParse(urlForwardCreateEndpoint.responseSchema, result.data).success).toBe(true)
})
test("urlForwardDelete builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await urlForwardDelete(client, { domain: "example.com", id: "12/3" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/deleteUrlForward/example.com/12%2F3")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(urlForwardDeleteEndpoint.responseSchema, result.data).success).toBe(true)
})
