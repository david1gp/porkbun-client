import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { aftermarketSearchEndpoint } from "./endpoint/aftermarketSearchEndpoint.js"
import { closeoutBuyEndpoint } from "./endpoint/closeoutBuyEndpoint.js"
import { closeoutGetEndpoint } from "./endpoint/closeoutGetEndpoint.js"
import { closeoutSearchEndpoint } from "./endpoint/closeoutSearchEndpoint.js"
import { marketplaceListEndpoint } from "./endpoint/marketplaceListEndpoint.js"
export const marketCommand = buildRouteMap({
  routes: {
    placeList: cliEndpointCommandCreate(marketplaceListEndpoint),
    aftermarketSearch: cliEndpointCommandCreate(aftermarketSearchEndpoint),
    closeoutSearch: cliEndpointCommandCreate(closeoutSearchEndpoint),
    closeoutGet: cliEndpointCommandCreate(closeoutGetEndpoint),
    closeoutBuy: cliEndpointCommandCreate(closeoutBuyEndpoint),
  },
  docs: { brief: "Manage market" },
})
