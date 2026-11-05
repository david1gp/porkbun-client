import { expect, test } from "bun:test"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { accountApiSettingsGetEndpoint } from "../endpoint/accountApiSettingsGetEndpoint.js"
import { accountAutoTopupGetEndpoint } from "../endpoint/accountAutoTopupGetEndpoint.js"
import { accountAutoTopupSetEndpoint } from "../endpoint/accountAutoTopupSetEndpoint.js"
import { accountBalanceGetEndpoint } from "../endpoint/accountBalanceGetEndpoint.js"
import { accountEmailVerificationConfirmEndpoint } from "../endpoint/accountEmailVerificationConfirmEndpoint.js"
import { accountEmailVerificationSendEndpoint } from "../endpoint/accountEmailVerificationSendEndpoint.js"
import { accountInviteCreateEndpoint } from "../endpoint/accountInviteCreateEndpoint.js"
import { accountInviteStatusGetEndpoint } from "../endpoint/accountInviteStatusGetEndpoint.js"
import { accountInvoiceGetEndpoint } from "../endpoint/accountInvoiceGetEndpoint.js"
import { accountInvoiceListEndpoint } from "../endpoint/accountInvoiceListEndpoint.js"
import { accountInvoicePdfGetEndpoint } from "../endpoint/accountInvoicePdfGetEndpoint.js"
import { accountPhoneVerificationConfirmEndpoint } from "../endpoint/accountPhoneVerificationConfirmEndpoint.js"
import { accountPhoneVerificationSendEndpoint } from "../endpoint/accountPhoneVerificationSendEndpoint.js"
import { accountTopupCryptoEndpoint } from "../endpoint/accountTopupCryptoEndpoint.js"
import { accountTopupCryptoStatusGetEndpoint } from "../endpoint/accountTopupCryptoStatusGetEndpoint.js"
import { accountTopupEndpoint } from "../endpoint/accountTopupEndpoint.js"
import { accountTopupMppEndpoint } from "../endpoint/accountTopupMppEndpoint.js"

test("accountBalanceGet builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountBalanceGetEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/balance")
})

test("accountApiSettingsGet builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountApiSettingsGetEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/apiSettings")
})

test("accountAutoTopupGet builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountAutoTopupGetEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/autoTopup")
})

test("accountAutoTopupSet builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountAutoTopupSetEndpoint, { enabled: true })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/autoTopup")
})

test("accountTopup builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountTopupEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/topup")
})

test("accountTopupCrypto builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountTopupCryptoEndpoint, { amount: 100 })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/topupCrypto")
})

test("accountTopupCryptoStatusGet builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountTopupCryptoStatusGetEndpoint, { checkoutId: "test" })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/topupCryptoStatus/test")
})

test("accountTopupMpp builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountTopupMppEndpoint, { amount: 500 })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/topupMpp")
})

test("accountInviteCreate builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({
    status: "SUCCESS",
    inviteToken: "a3f8c2...",
    inviteUrl: "https://porkbun.com/account/create?invite=a3f8c2...",
    expires: "2024-01-16 14:30:00",
  })
  const result = await porkbunEndpointCall(client, accountInviteCreateEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/invite")
})

test("accountInviteStatusGet builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", inviteStatus: "PENDING" })
  const result = await porkbunEndpointCall(client, accountInviteStatusGetEndpoint, { token: "test" })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/inviteStatus")
})

test("accountInvoiceList builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountInvoiceListEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/invoices")
})

test("accountInvoiceGet builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountInvoiceGetEndpoint, { orderId: 1 })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/invoice/1")
})

test("accountInvoicePdfGet builds its GET request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountInvoicePdfGetEndpoint, { orderId: 1 })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("GET")
  expect(calls[0]!.url).toContain("/account/invoicePdf/1")
})

test("accountPhoneVerificationSend builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountPhoneVerificationSendEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/verifyPhone/send")
})

test("accountPhoneVerificationConfirm builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountPhoneVerificationConfirmEndpoint, { code: "test" })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/verifyPhone/confirm")
})

test("accountEmailVerificationSend builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountEmailVerificationSendEndpoint, {})
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/verifyEmail/send")
})

test("accountEmailVerificationConfirm builds its POST request", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS" })
  const result = await porkbunEndpointCall(client, accountEmailVerificationConfirmEndpoint, { code: "test" })
  expect(result.success).toBe(true)
  expect(calls[0]!.init?.method).toBe("POST")
  expect(calls[0]!.url).toContain("/account/verifyEmail/confirm")
})
