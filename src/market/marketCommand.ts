import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { aftermarketSearchEndpoint } from "./endpoint/aftermarketSearchEndpoint.js"
import { closeoutBuyEndpoint } from "./endpoint/closeoutBuyEndpoint.js"
import { closeoutGetEndpoint } from "./endpoint/closeoutGetEndpoint.js"
import { closeoutSearchEndpoint } from "./endpoint/closeoutSearchEndpoint.js"
import { marketplaceListEndpoint } from "./endpoint/marketplaceListEndpoint.js"
export const marketCommand = buildRouteMap({
  routes: {
    marketplace: buildRouteMap({
      routes: { list: cliEndpointCommandCreate(marketplaceListEndpoint) },
      docs: { brief: "Browse the marketplace" },
    }),
    aftermarket: buildRouteMap({
      routes: {
        search: cliEndpointCommandCreate(aftermarketSearchEndpoint),
      },
      docs: { brief: "Manage aftermarket" },
    }),
    closeout: buildRouteMap({
      routes: {
        search: cliEndpointCommandCreate(closeoutSearchEndpoint),
        get: cliEndpointCommandCreate(closeoutGetEndpoint),
        buy: cliEndpointCommandCreate(closeoutBuyEndpoint),
      },
      docs: { brief: "Manage closeout" },
    }),
  },
  docs: { brief: "Manage market" },
})
