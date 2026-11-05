import { expect, test } from "bun:test"
import * as a from "valibot"
import { domainAutoRenewUpdate } from "../src/domain/api/domainAutoRenewUpdate.js"
import { domainCheck } from "../src/domain/api/domainCheck.js"
import { domainCheckBulk } from "../src/domain/api/domainCheckBulk.js"
import { domainContactList } from "../src/domain/api/domainContactList.js"
import { domainContactUpdate } from "../src/domain/api/domainContactUpdate.js"
import { domainCreate } from "../src/domain/api/domainCreate.js"
import { domainGet } from "../src/domain/api/domainGet.js"
import { domainList } from "../src/domain/api/domainList.js"
import { domainNameserverList } from "../src/domain/api/domainNameserverList.js"
import { domainNameserverUpdate } from "../src/domain/api/domainNameserverUpdate.js"
import { domainRegistrationRequirementsGet } from "../src/domain/api/domainRegistrationRequirementsGet.js"
import { domainRenew } from "../src/domain/api/domainRenew.js"
import { domainAutoRenewUpdateEndpoint } from "../src/domain/endpoint/domainAutoRenewUpdateEndpoint.js"
import { domainCheckBulkEndpoint } from "../src/domain/endpoint/domainCheckBulkEndpoint.js"
import { domainCheckEndpoint } from "../src/domain/endpoint/domainCheckEndpoint.js"
import { domainContactListEndpoint } from "../src/domain/endpoint/domainContactListEndpoint.js"
import { domainContactUpdateEndpoint } from "../src/domain/endpoint/domainContactUpdateEndpoint.js"
import { domainCreateEndpoint } from "../src/domain/endpoint/domainCreateEndpoint.js"
import { domainGetEndpoint } from "../src/domain/endpoint/domainGetEndpoint.js"
import { domainListEndpoint } from "../src/domain/endpoint/domainListEndpoint.js"
import { domainNameserverListEndpoint } from "../src/domain/endpoint/domainNameserverListEndpoint.js"
import { domainNameserverUpdateEndpoint } from "../src/domain/endpoint/domainNameserverUpdateEndpoint.js"
import { domainRegistrationRequirementsGetEndpoint } from "../src/domain/endpoint/domainRegistrationRequirementsGetEndpoint.js"
import { domainRenewEndpoint } from "../src/domain/endpoint/domainRenewEndpoint.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const c = porkbunE2eClientCreate()
if (!c.success) throw new Error(c.errorMessage)
const client = c.data
test("mock domainCheck", async () => {
  const r = await domainCheck(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainCheckEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainCheckBulk", async () => {
  const r = await domainCheckBulk(
    client,
    { domains: ["example.com", "example.net"] },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainCheckBulkEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainCreate", async () => {
  const r = await domainCreate(
    client,
    { domain: "example.com", cost: 1000, agreeToTerms: "yes", dryRun: true },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainCreateEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainRenew", async () => {
  const r = await domainRenew(
    client,
    { domain: "example.com", cost: 1000, dryRun: true },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainRenewEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainList", async () => {
  const r = await domainList(client, { start: 0, includeLabels: "yes" }, { signal: AbortSignal.timeout(30000) })
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainListEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainGet", async () => {
  const r = await domainGet(
    client,
    { domain: "example.com", includeLabels: "yes" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainGetEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainAutoRenewUpdate", async () => {
  const r = await domainAutoRenewUpdate(
    client,
    { domain: "example.com", status: "on", domains: ["example.net"] },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainAutoRenewUpdateEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainNameserverList", async () => {
  const r = await domainNameserverList(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainNameserverListEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainNameserverUpdate", async () => {
  const r = await domainNameserverUpdate(
    client,
    { domain: "example.com", ns: ["ns1.example.com", "ns2.example.com"], dryRun: true },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainNameserverUpdateEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainContactList", async () => {
  const r = await domainContactList(client, { domain: "example.com" }, { signal: AbortSignal.timeout(30000) })
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainContactListEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainContactUpdate", async () => {
  const r = await domainContactUpdate(
    client,
    {
      domain: "example.com",
      contact: {
        firstName: "Ada",
        lastName: "Lovelace",
        address1: "1 Countess Rd",
        city: "London",
        postalCode: "NW5 1AA",
        country: "GB",
        phone: "2071234567",
        phoneCountryCode: "44",
        email: "ada@example.com",
      },
      dryRun: true,
    },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(r.success).toBe(true)
  if (r.success) expect(a.safeParse(domainContactUpdateEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
test("mock domainRegistrationRequirementsGet", async () => {
  const r = await domainRegistrationRequirementsGet(client, { tld: "com" }, { signal: AbortSignal.timeout(30000) })
  expect(r.success).toBe(true)
  if (r.success)
    expect(a.safeParse(domainRegistrationRequirementsGetEndpoint.responseSchema, r.data).success).toBe(true)
}, 35000)
