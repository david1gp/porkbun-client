import { expect, test } from "bun:test"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { domainAutoRenewUpdate } from "./domainAutoRenewUpdate.js"
import { domainCheck } from "./domainCheck.js"
import { domainCheckBulk } from "./domainCheckBulk.js"
import { domainContactList } from "./domainContactList.js"
import { domainContactUpdate } from "./domainContactUpdate.js"
import { domainCreate } from "./domainCreate.js"
import { domainGet } from "./domainGet.js"
import { domainList } from "./domainList.js"
import { domainNameserverList } from "./domainNameserverList.js"
import { domainNameserverUpdate } from "./domainNameserverUpdate.js"
import { domainRegistrationRequirementsGet } from "./domainRegistrationRequirementsGet.js"
import { domainRenew } from "./domainRenew.js"

test("domainCheck builds POST /domain/checkDomain/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainCheck(client, { domain: "example.com" })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/checkDomain/example.com")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainCheckBulk builds POST /domain/checkDomain", async () => {
  const { client, calls } = porkbunTestClient()
  await domainCheckBulk(client, { domains: ["example.com", "example.net"] })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/checkDomain")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainCreate builds POST /domain/create/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainCreate(client, { domain: "example.com", cost: 1000, agreeToTerms: "yes", dryRun: true })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/create/example.com")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainRenew builds POST /domain/renew/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainRenew(client, { domain: "example.com", cost: 1000, dryRun: true })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/renew/example.com")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainList builds POST /domain/listAll", async () => {
  const { client, calls } = porkbunTestClient()
  await domainList(client, { start: 0, includeLabels: "yes" })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/listAll")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainGet builds GET /domain/get/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainGet(client, { domain: "example.com", includeLabels: "yes" })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/get/example.com?includeLabels=yes")
  expect(calls[0]?.init?.method).toBe("GET")
})
for (const domain of ["example.com", undefined, ""] as const) {
  test(`domainAutoRenewUpdate accepts ${domain ? "path domain" : "body-only bulk domains"} (${JSON.stringify(domain)})`, async () => {
    const { client, calls } = porkbunTestClient({
      status: "SUCCESS",
      results: { "example.net": { status: "SUCCESS" } },
    })
    const result = await domainAutoRenewUpdate(client, { domain, status: "on", domains: ["example.net"] })
    expect(result.success).toBe(true)
    expect(calls[0]?.url).toBe(
      `https://api.porkbun.com/api/json/v3/domain/updateAutoRenew${domain ? `/${domain}` : ""}`,
    )
    expect(calls[0]?.init?.method).toBe("POST")
    expect(calls[0]?.body).toEqual({
      status: "on",
      domains: ["example.net"],
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    })
  })
}

test("domainNameserverList builds POST /domain/getNs/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainNameserverList(client, { domain: "example.com" })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/getNs/example.com")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainNameserverUpdate builds POST /domain/updateNs/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainNameserverUpdate(client, {
    domain: "example.com",
    ns: ["ns1.example.com", "ns2.example.com"],
    dryRun: true,
  })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/updateNs/example.com")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainContactList builds GET /domain/getContacts/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainContactList(client, { domain: "example.com" })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/getContacts/example.com")
  expect(calls[0]?.init?.method).toBe("GET")
})
test("domainContactUpdate builds POST /domain/updateContacts/{domain}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainContactUpdate(client, { domain: "example.com", contact: { firstName: "Ada" }, dryRun: true })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/updateContacts/example.com")
  expect(calls[0]?.init?.method).toBe("POST")
})
test("domainRegistrationRequirementsGet builds GET /domain/getRegistrationRequirements/{tld}", async () => {
  const { client, calls } = porkbunTestClient()
  await domainRegistrationRequirementsGet(client, { tld: "com" })
  expect(calls[0]?.url).toBe("https://api.porkbun.com/api/json/v3/domain/getRegistrationRequirements/com")
  expect(calls[0]?.init?.method).toBe("GET")
})
