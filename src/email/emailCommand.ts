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
    passwordSet: cliEndpointCommandCreate(emailPasswordSetEndpoint),
    forward: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(emailForwardListEndpoint),
        create: cliEndpointCommandCreate(emailForwardCreateEndpoint),
        delete: cliEndpointCommandCreate(emailForwardDeleteEndpoint),
      },
      docs: { brief: "Manage forward" },
    }),
    mailbox: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(emailMailboxListEndpoint),
        setup: cliEndpointCommandCreate(emailMailboxSetupEndpoint),
        create: cliEndpointCommandCreate(emailMailboxCreateEndpoint),
        renew: cliEndpointCommandCreate(emailMailboxRenewEndpoint),
      },
      docs: { brief: "Manage mailbox" },
    }),
  },
  docs: { brief: "Manage email" },
})
