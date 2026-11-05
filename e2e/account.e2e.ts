import { expect, test } from "bun:test"
import * as a from "valibot"
import { accountApiSettingsGetEndpoint } from "../src/account/endpoint/accountApiSettingsGetEndpoint.js"
import { accountAutoTopupGetEndpoint } from "../src/account/endpoint/accountAutoTopupGetEndpoint.js"
import { accountAutoTopupSetEndpoint } from "../src/account/endpoint/accountAutoTopupSetEndpoint.js"
import { accountBalanceGetEndpoint } from "../src/account/endpoint/accountBalanceGetEndpoint.js"
import { accountEmailVerificationConfirmEndpoint } from "../src/account/endpoint/accountEmailVerificationConfirmEndpoint.js"
import { accountEmailVerificationSendEndpoint } from "../src/account/endpoint/accountEmailVerificationSendEndpoint.js"
import { accountInviteCreateEndpoint } from "../src/account/endpoint/accountInviteCreateEndpoint.js"
import { accountInviteStatusGetEndpoint } from "../src/account/endpoint/accountInviteStatusGetEndpoint.js"
import { accountInvoiceGetEndpoint } from "../src/account/endpoint/accountInvoiceGetEndpoint.js"
import { accountInvoiceListEndpoint } from "../src/account/endpoint/accountInvoiceListEndpoint.js"
import { accountInvoicePdfGetEndpoint } from "../src/account/endpoint/accountInvoicePdfGetEndpoint.js"
import { accountPhoneVerificationConfirmEndpoint } from "../src/account/endpoint/accountPhoneVerificationConfirmEndpoint.js"
import { accountPhoneVerificationSendEndpoint } from "../src/account/endpoint/accountPhoneVerificationSendEndpoint.js"
import { accountTopupCryptoEndpoint } from "../src/account/endpoint/accountTopupCryptoEndpoint.js"
import { accountTopupCryptoStatusGetEndpoint } from "../src/account/endpoint/accountTopupCryptoStatusGetEndpoint.js"
import { accountTopupEndpoint } from "../src/account/endpoint/accountTopupEndpoint.js"
import { accountTopupMppEndpoint } from "../src/account/endpoint/accountTopupMppEndpoint.js"
import { porkbunClientCreate } from "../src/shared/porkbunClientCreate.js"
import { porkbunEndpointCall } from "../src/shared/porkbunEndpointCall.js"
import { porkbunMockBaseUrl } from "../src/shared/porkbunMockBaseUrl.js"

const clientResult = porkbunClientCreate({ baseUrl: porkbunMockBaseUrl, apiKey: "pk1_mock", secretApiKey: "sk1_mock" })
if (!clientResult.success) throw new Error(clientResult.errorMessage)
const client = clientResult.data

test("mock accountBalanceGet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountBalanceGetEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountBalanceGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountApiSettingsGet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountApiSettingsGetEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountApiSettingsGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountAutoTopupGet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountAutoTopupGetEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountAutoTopupGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountAutoTopupSet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountAutoTopupSetEndpoint,
    { enabled: true },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountAutoTopupSetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountTopup returns a valid response", async () => {
  const result = await porkbunEndpointCall(client, accountTopupEndpoint, {}, { signal: AbortSignal.timeout(30000) })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountTopupEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountTopupCrypto returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountTopupCryptoEndpoint,
    { amount: 100 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountTopupCryptoEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountTopupCryptoStatusGet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountTopupCryptoStatusGetEndpoint,
    { checkoutId: "test" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(accountTopupCryptoStatusGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountTopupMpp returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountTopupMppEndpoint,
    { amount: 500 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountTopupMppEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountInviteCreate returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountInviteCreateEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountInviteCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountInviteStatusGet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountInviteStatusGetEndpoint,
    { token: "test" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountInviteStatusGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountInvoiceList returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountInvoiceListEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountInvoiceListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountInvoiceGet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountInvoiceGetEndpoint,
    { orderId: 1 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountInvoiceGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountInvoicePdfGet returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountInvoicePdfGetEndpoint,
    { orderId: 1 },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(accountInvoicePdfGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountPhoneVerificationSend returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountPhoneVerificationSendEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(accountPhoneVerificationSendEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountPhoneVerificationConfirm returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountPhoneVerificationConfirmEndpoint,
    { code: "test" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(accountPhoneVerificationConfirmEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountEmailVerificationSend returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountEmailVerificationSendEndpoint,
    {},
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(accountEmailVerificationSendEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)

test("mock accountEmailVerificationConfirm returns a valid response", async () => {
  const result = await porkbunEndpointCall(
    client,
    accountEmailVerificationConfirmEndpoint,
    { code: "test" },
    { signal: AbortSignal.timeout(30000) },
  )
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(accountEmailVerificationConfirmEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
