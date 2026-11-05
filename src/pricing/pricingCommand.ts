import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { pricingGetEndpoint } from "./endpoint/pricingGetEndpoint.js"

export const pricingCommand = buildRouteMap({
  routes: { get: cliEndpointCommandCreate(pricingGetEndpoint) },
  docs: { brief: "Retrieve domain pricing" },
})
