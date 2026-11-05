import { expect, test } from "bun:test"
import * as a from "valibot"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { glueCreateEndpoint } from "../endpoint/glueCreateEndpoint.js"
import { glueDeleteEndpoint } from "../endpoint/glueDeleteEndpoint.js"
import { glueListEndpoint } from "../endpoint/glueListEndpoint.js"
import { glueUpdateEndpoint } from "../endpoint/glueUpdateEndpoint.js"
import { glueCreate } from "./glueCreate.js"
import { glueDelete } from "./glueDelete.js"
import { glueList } from "./glueList.js"
import { glueUpdate } from "./glueUpdate.js"

test("glueList builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await glueList(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/getGlue/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(glueListEndpoint.responseSchema, result.data).success).toBe(true)
})
test("glueCreate builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await glueCreate(client, { domain: "example.com", subdomain: "ns 1", ips: ["1.2.3.4", "2001:db8::1"] })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/createGlue/example.com/ns%201")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ ips: ["1.2.3.4", "2001:db8::1"], apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(glueCreateEndpoint.responseSchema, result.data).success).toBe(true)
})
test("glueUpdate builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await glueUpdate(client, { domain: "example.com", subdomain: "ns 1", ips: ["1.2.3.4", "2001:db8::1"] })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/updateGlue/example.com/ns%201")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ ips: ["1.2.3.4", "2001:db8::1"], apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(glueUpdateEndpoint.responseSchema, result.data).success).toBe(true)
})
test("glueDelete builds its POST request and parses a success", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await glueDelete(client, { domain: "example.com", subdomain: "ns 1" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/domain/deleteGlue/example.com/ns%201")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toEqual({ apikey: "pk1_test", secretapikey: "sk1_test" })
  if (result.success) expect(a.safeParse(glueDeleteEndpoint.responseSchema, result.data).success).toBe(true)
})

test("glueList accepts documented address tuples and typed glue objects", () => {
  const response = {
    status: "SUCCESS",
    hosts: [["ns1.example.com", { v4: ["192.0.2.1"], v6: [] }]],
    glue: [{ host: "ns1.example.com", v4: ["192.0.2.1"], v6: [] }],
  }
  expect(a.safeParse(glueListEndpoint.responseSchema, response).success).toBe(true)
  expect(a.safeParse(glueListEndpoint.responseSchema, { ...response, glue: [{ host: "ns1", v4: [] }] }).success).toBe(
    false,
  )
})
