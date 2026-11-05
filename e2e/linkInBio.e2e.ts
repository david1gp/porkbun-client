import { expect, test } from "bun:test"
import * as a from "valibot"
import { linkInBioAppearanceUpdateEndpoint } from "../src/linkInBio/endpoint/linkInBioAppearanceUpdateEndpoint.js"
import { linkInBioCreateEndpoint } from "../src/linkInBio/endpoint/linkInBioCreateEndpoint.js"
import { linkInBioGetEndpoint } from "../src/linkInBio/endpoint/linkInBioGetEndpoint.js"
import { linkInBioLinkCreateEndpoint } from "../src/linkInBio/endpoint/linkInBioLinkCreateEndpoint.js"
import { linkInBioLinkDeleteEndpoint } from "../src/linkInBio/endpoint/linkInBioLinkDeleteEndpoint.js"
import { linkInBioLinkEditEndpoint } from "../src/linkInBio/endpoint/linkInBioLinkEditEndpoint.js"
import { linkInBioLinkReorderEndpoint } from "../src/linkInBio/endpoint/linkInBioLinkReorderEndpoint.js"
import { linkInBioProfileUpdateEndpoint } from "../src/linkInBio/endpoint/linkInBioProfileUpdateEndpoint.js"
import { linkInBioSettingsUpdateEndpoint } from "../src/linkInBio/endpoint/linkInBioSettingsUpdateEndpoint.js"
import { linkInBioSocialsUpdateEndpoint } from "../src/linkInBio/endpoint/linkInBioSocialsUpdateEndpoint.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const clientResult = porkbunE2eClientCreate()
if (!clientResult.success) throw new Error(clientResult.errorMessage)
const client = clientResult.data

test("mock linkInBioAppearanceUpdateEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioAppearanceUpdateEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(linkInBioAppearanceUpdateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioCreateEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioCreateEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioGetEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioGetEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioLinkCreateEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioLinkCreateEndpoint,
    { domain: "example.com", title: "A" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioLinkCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioLinkDeleteEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioLinkDeleteEndpoint,
    { domain: "example.com", id: 1 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioLinkDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioLinkEditEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioLinkEditEndpoint,
    { domain: "example.com", id: 1 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioLinkEditEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioLinkReorderEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioLinkReorderEndpoint,
    { domain: "example.com", ids: [1] },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioLinkReorderEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioProfileUpdateEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioProfileUpdateEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioProfileUpdateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioSettingsUpdateEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioSettingsUpdateEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(linkInBioSettingsUpdateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock linkInBioSocialsUpdateEndpoint", async () => {
  const result = await porkbunEndpointCall(
    client,
    linkInBioSocialsUpdateEndpoint,
    { domain: "example.com" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(linkInBioSocialsUpdateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
