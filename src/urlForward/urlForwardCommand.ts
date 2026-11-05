import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { urlForwardCreateEndpoint } from "./endpoint/urlForwardCreateEndpoint.js"
import { urlForwardDeleteEndpoint } from "./endpoint/urlForwardDeleteEndpoint.js"
import { urlForwardListEndpoint } from "./endpoint/urlForwardListEndpoint.js"
export const urlForwardCommand = buildRouteMap({
  routes: {
    list: cliEndpointCommandCreate(urlForwardListEndpoint),
    create: cliEndpointCommandCreate(urlForwardCreateEndpoint),
    delete: cliEndpointCommandCreate(urlForwardDeleteEndpoint),
  },
  docs: { brief: "Manage URL forwards" },
})
