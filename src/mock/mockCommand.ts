import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { mockEndpointListEndpoint } from "./endpoint/mockEndpointListEndpoint.js"
import { mockEndpointCallCommand } from "./mockEndpointCallCommand.js"
export const mockCommand = buildRouteMap({
  routes: { call: mockEndpointCallCommand, list: cliEndpointCommandCreate(mockEndpointListEndpoint) },
  docs: { brief: "Manage mock" },
})
