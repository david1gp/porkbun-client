import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { accountInvoicePdfCommand } from "./accountInvoicePdfCommand.js"
import { accountApiSettingsGetEndpoint } from "./endpoint/accountApiSettingsGetEndpoint.js"
import { accountAutoTopupGetEndpoint } from "./endpoint/accountAutoTopupGetEndpoint.js"
import { accountAutoTopupSetEndpoint } from "./endpoint/accountAutoTopupSetEndpoint.js"
import { accountBalanceGetEndpoint } from "./endpoint/accountBalanceGetEndpoint.js"
import { accountEmailVerificationConfirmEndpoint } from "./endpoint/accountEmailVerificationConfirmEndpoint.js"
import { accountEmailVerificationSendEndpoint } from "./endpoint/accountEmailVerificationSendEndpoint.js"
import { accountInviteCreateEndpoint } from "./endpoint/accountInviteCreateEndpoint.js"
import { accountInviteStatusGetEndpoint } from "./endpoint/accountInviteStatusGetEndpoint.js"
import { accountInvoiceGetEndpoint } from "./endpoint/accountInvoiceGetEndpoint.js"
import { accountInvoiceListEndpoint } from "./endpoint/accountInvoiceListEndpoint.js"
import { accountPhoneVerificationConfirmEndpoint } from "./endpoint/accountPhoneVerificationConfirmEndpoint.js"
import { accountPhoneVerificationSendEndpoint } from "./endpoint/accountPhoneVerificationSendEndpoint.js"
import { accountTopupCryptoEndpoint } from "./endpoint/accountTopupCryptoEndpoint.js"
import { accountTopupCryptoStatusGetEndpoint } from "./endpoint/accountTopupCryptoStatusGetEndpoint.js"
import { accountTopupEndpoint } from "./endpoint/accountTopupEndpoint.js"
import { accountTopupMppEndpoint } from "./endpoint/accountTopupMppEndpoint.js"

export const accountCommand = buildRouteMap({
  routes: {
    balanceGet: cliEndpointCommandCreate(accountBalanceGetEndpoint),
    apiSettingsGet: cliEndpointCommandCreate(accountApiSettingsGetEndpoint),
    autoTopupGet: cliEndpointCommandCreate(accountAutoTopupGetEndpoint),
    autoTopupSet: cliEndpointCommandCreate(accountAutoTopupSetEndpoint),
    topup: cliEndpointCommandCreate(accountTopupEndpoint),
    topupCrypto: cliEndpointCommandCreate(accountTopupCryptoEndpoint),
    topupCryptoStatusGet: cliEndpointCommandCreate(accountTopupCryptoStatusGetEndpoint),
    topupMpp: cliEndpointCommandCreate(accountTopupMppEndpoint),
    invite: buildRouteMap({
      routes: {
        create: cliEndpointCommandCreate(accountInviteCreateEndpoint),
        statusGet: cliEndpointCommandCreate(accountInviteStatusGetEndpoint),
      },
      docs: { brief: "Manage invite" },
    }),
    invoice: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(accountInvoiceListEndpoint),
        get: cliEndpointCommandCreate(accountInvoiceGetEndpoint),
        pdf: accountInvoicePdfCommand,
      },
      docs: { brief: "Manage invoice" },
    }),
    phoneVerification: buildRouteMap({
      routes: {
        send: cliEndpointCommandCreate(accountPhoneVerificationSendEndpoint),
        confirm: cliEndpointCommandCreate(accountPhoneVerificationConfirmEndpoint),
      },
      docs: { brief: "Manage phone verification" },
    }),
    emailVerification: buildRouteMap({
      routes: {
        send: cliEndpointCommandCreate(accountEmailVerificationSendEndpoint),
        confirm: cliEndpointCommandCreate(accountEmailVerificationConfirmEndpoint),
      },
      docs: { brief: "Manage email verification" },
    }),
  },
  docs: { brief: "Manage account" },
})
