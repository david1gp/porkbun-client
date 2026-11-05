import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { glueCreateEndpoint } from "./endpoint/glueCreateEndpoint.js"
import { glueDeleteEndpoint } from "./endpoint/glueDeleteEndpoint.js"
import { glueListEndpoint } from "./endpoint/glueListEndpoint.js"
import { glueUpdateEndpoint } from "./endpoint/glueUpdateEndpoint.js"
export const glueCommand = buildRouteMap({
  routes: {
    list: cliEndpointCommandCreate(glueListEndpoint),
    create: cliEndpointCommandCreate(glueCreateEndpoint),
    update: cliEndpointCommandCreate(glueUpdateEndpoint),
    delete: cliEndpointCommandCreate(glueDeleteEndpoint),
  },
  docs: { brief: "Manage glue records" },
})
