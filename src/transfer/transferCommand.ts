import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { transferAuthCodeUpdateEndpoint } from "./endpoint/transferAuthCodeUpdateEndpoint.js"
import { transferCancelEndpoint } from "./endpoint/transferCancelEndpoint.js"
import { transferCreateEndpoint } from "./endpoint/transferCreateEndpoint.js"
import { transferGetEndpoint } from "./endpoint/transferGetEndpoint.js"
import { transferListEndpoint } from "./endpoint/transferListEndpoint.js"
import { transferPrepareEndpoint } from "./endpoint/transferPrepareEndpoint.js"
import { transferSetupGetEndpoint } from "./endpoint/transferSetupGetEndpoint.js"
import { transferStartEndpoint } from "./endpoint/transferStartEndpoint.js"
export const transferCommand = buildRouteMap({
  routes: {
    create: cliEndpointCommandCreate(transferCreateEndpoint),
    setupGet: cliEndpointCommandCreate(transferSetupGetEndpoint),
    prepare: cliEndpointCommandCreate(transferPrepareEndpoint),
    start: cliEndpointCommandCreate(transferStartEndpoint),
    cancel: cliEndpointCommandCreate(transferCancelEndpoint),
    authCodeUpdate: cliEndpointCommandCreate(transferAuthCodeUpdateEndpoint),
    get: cliEndpointCommandCreate(transferGetEndpoint),
    list: cliEndpointCommandCreate(transferListEndpoint),
  },
  docs: { brief: "Manage transfers" },
})
