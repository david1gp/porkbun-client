import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { apiKeyRequestEndpoint } from "./endpoint/apiKeyRequestEndpoint.js"
import { apiKeyRetrieveEndpoint } from "./endpoint/apiKeyRetrieveEndpoint.js"
import { apiKeyRevokeEndpoint } from "./endpoint/apiKeyRevokeEndpoint.js"

export const apiKeyCommand = buildRouteMap({
  routes: {
    request: cliEndpointCommandCreate(apiKeyRequestEndpoint),
    retrieve: cliEndpointCommandCreate(apiKeyRetrieveEndpoint),
    revoke: cliEndpointCommandCreate(apiKeyRevokeEndpoint),
  },
  docs: { brief: "Manage API keys" },
})
