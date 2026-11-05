import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { emailForwardCreateEndpoint } from "./endpoint/emailForwardCreateEndpoint.js"
import { emailForwardDeleteEndpoint } from "./endpoint/emailForwardDeleteEndpoint.js"
import { emailForwardListEndpoint } from "./endpoint/emailForwardListEndpoint.js"
import { emailMailboxCreateEndpoint } from "./endpoint/emailMailboxCreateEndpoint.js"
import { emailMailboxListEndpoint } from "./endpoint/emailMailboxListEndpoint.js"
import { emailMailboxRenewEndpoint } from "./endpoint/emailMailboxRenewEndpoint.js"
import { emailMailboxSetupEndpoint } from "./endpoint/emailMailboxSetupEndpoint.js"
import { emailPasswordSetEndpoint } from "./endpoint/emailPasswordSetEndpoint.js"
export const emailCommand = buildRouteMap({
  routes: {
    forwardList: cliEndpointCommandCreate(emailForwardListEndpoint),
    forwardCreate: cliEndpointCommandCreate(emailForwardCreateEndpoint),
    forwardDelete: cliEndpointCommandCreate(emailForwardDeleteEndpoint),
    mailboxList: cliEndpointCommandCreate(emailMailboxListEndpoint),
    mailboxSetup: cliEndpointCommandCreate(emailMailboxSetupEndpoint),
    mailboxCreate: cliEndpointCommandCreate(emailMailboxCreateEndpoint),
    mailboxRenew: cliEndpointCommandCreate(emailMailboxRenewEndpoint),
    passwordSet: cliEndpointCommandCreate(emailPasswordSetEndpoint),
  },
  docs: { brief: "Manage email" },
})
