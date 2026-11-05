import { expect, test } from "bun:test"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { linkInBioAppearanceUpdateEndpoint } from "../endpoint/linkInBioAppearanceUpdateEndpoint.js"
import { linkInBioCreateEndpoint } from "../endpoint/linkInBioCreateEndpoint.js"
import { linkInBioGetEndpoint } from "../endpoint/linkInBioGetEndpoint.js"
import { linkInBioLinkCreateEndpoint } from "../endpoint/linkInBioLinkCreateEndpoint.js"
import { linkInBioLinkDeleteEndpoint } from "../endpoint/linkInBioLinkDeleteEndpoint.js"
import { linkInBioLinkEditEndpoint } from "../endpoint/linkInBioLinkEditEndpoint.js"
import { linkInBioLinkReorderEndpoint } from "../endpoint/linkInBioLinkReorderEndpoint.js"
import { linkInBioProfileUpdateEndpoint } from "../endpoint/linkInBioProfileUpdateEndpoint.js"
import { linkInBioSettingsUpdateEndpoint } from "../endpoint/linkInBioSettingsUpdateEndpoint.js"
import { linkInBioSocialsUpdateEndpoint } from "../endpoint/linkInBioSocialsUpdateEndpoint.js"

test("linkInBioAppearanceUpdateEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioAppearanceUpdateEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/updateAppearance/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioCreateEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioCreateEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/create/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioGetEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioGetEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/get/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioLinkCreateEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioLinkCreateEndpoint, { domain: "example.com", title: "A" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/addLink/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioLinkDeleteEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioLinkDeleteEndpoint, { domain: "example.com", id: 1 })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/deleteLink/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioLinkEditEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioLinkEditEndpoint, { domain: "example.com", id: 1 })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/editLink/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioLinkReorderEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioLinkReorderEndpoint, { domain: "example.com", ids: [1] })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/reorderLinks/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioProfileUpdateEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioProfileUpdateEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/updateProfile/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioSettingsUpdateEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioSettingsUpdateEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/updateSettings/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
test("linkInBioSocialsUpdateEndpoint builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, linkInBioSocialsUpdateEndpoint, { domain: "example.com" })
  expect(result.success).toBe(true)
  expect(calls[0]!.url).toBe("https://api.porkbun.com/api/json/v3/linkinbio/updateSocials/example.com")
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.body).toMatchObject({ apikey: "pk1_test", secretapikey: "sk1_test" })
})
