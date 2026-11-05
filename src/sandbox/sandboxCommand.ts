import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { sandboxResetEndpoint } from "./endpoint/sandboxResetEndpoint.js"
import { sandboxTopupEndpoint } from "./endpoint/sandboxTopupEndpoint.js"
import { sandboxWebhookTriggerEndpoint } from "./endpoint/sandboxWebhookTriggerEndpoint.js"

export const sandboxCommand = buildRouteMap({
  routes: {
    topup: cliEndpointCommandCreate(sandboxTopupEndpoint),
    reset: cliEndpointCommandCreate(sandboxResetEndpoint),
    webhook: buildRouteMap({
      routes: {
        trigger: cliEndpointCommandCreate(sandboxWebhookTriggerEndpoint),
      },
      docs: { brief: "Manage webhooks" },
    }),
  },
  docs: { brief: "Manage sandbox" },
})
