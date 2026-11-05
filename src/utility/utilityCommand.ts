import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { utilityIpEndpoint } from "./endpoint/utilityIpEndpoint.js"
import { utilityPingEndpoint } from "./endpoint/utilityPingEndpoint.js"

export const utilityCommand = buildRouteMap({
  routes: {
    ip: cliEndpointCommandCreate(utilityIpEndpoint),
    ping: cliEndpointCommandCreate(utilityPingEndpoint),
  },
  docs: { brief: "Test credentials and discover your public IP" },
})
