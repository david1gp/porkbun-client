import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { webhookCreateEndpoint } from "./endpoint/webhookCreateEndpoint.js"
import { webhookDeleteEndpoint } from "./endpoint/webhookDeleteEndpoint.js"
import { webhookDeliveryGetEndpoint } from "./endpoint/webhookDeliveryGetEndpoint.js"
import { webhookDeliveryListEndpoint } from "./endpoint/webhookDeliveryListEndpoint.js"
import { webhookDeliveryResendEndpoint } from "./endpoint/webhookDeliveryResendEndpoint.js"
import { webhookEventTypeListEndpoint } from "./endpoint/webhookEventTypeListEndpoint.js"
import { webhookGetEndpoint } from "./endpoint/webhookGetEndpoint.js"
import { webhookListEndpoint } from "./endpoint/webhookListEndpoint.js"
import { webhookSecretRotateEndpoint } from "./endpoint/webhookSecretRotateEndpoint.js"
import { webhookTestEndpoint } from "./endpoint/webhookTestEndpoint.js"
import { webhookUpdateEndpoint } from "./endpoint/webhookUpdateEndpoint.js"
export const webhookCommand = buildRouteMap({
  routes: {
    list: cliEndpointCommandCreate(webhookListEndpoint),
    get: cliEndpointCommandCreate(webhookGetEndpoint),
    create: cliEndpointCommandCreate(webhookCreateEndpoint),
    update: cliEndpointCommandCreate(webhookUpdateEndpoint),
    secretRotate: cliEndpointCommandCreate(webhookSecretRotateEndpoint),
    test: cliEndpointCommandCreate(webhookTestEndpoint),
    delete: cliEndpointCommandCreate(webhookDeleteEndpoint),
    eventType: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(webhookEventTypeListEndpoint),
      },
      docs: { brief: "Manage event type" },
    }),
    delivery: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(webhookDeliveryListEndpoint),
        get: cliEndpointCommandCreate(webhookDeliveryGetEndpoint),
        resend: cliEndpointCommandCreate(webhookDeliveryResendEndpoint),
      },
      docs: { brief: "Manage delivery" },
    }),
  },
  docs: { brief: "Manage webhooks" },
})
