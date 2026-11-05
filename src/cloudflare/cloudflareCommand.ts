import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { cloudflareConnectEndpoint } from "./endpoint/cloudflareConnectEndpoint.js"
import { cloudflareConnectionGetEndpoint } from "./endpoint/cloudflareConnectionGetEndpoint.js"
import { cloudflareDisconnectEndpoint } from "./endpoint/cloudflareDisconnectEndpoint.js"
import { cloudflareInventoryListEndpoint } from "./endpoint/cloudflareInventoryListEndpoint.js"
import { cloudflareMoveGetEndpoint } from "./endpoint/cloudflareMoveGetEndpoint.js"
import { cloudflareMovePreviewEndpoint } from "./endpoint/cloudflareMovePreviewEndpoint.js"
import { cloudflareMoveRetryEndpoint } from "./endpoint/cloudflareMoveRetryEndpoint.js"
import { cloudflareMoveRollbackEndpoint } from "./endpoint/cloudflareMoveRollbackEndpoint.js"
import { cloudflareProxySetEndpoint } from "./endpoint/cloudflareProxySetEndpoint.js"
import { cloudflareQueueListEndpoint } from "./endpoint/cloudflareQueueListEndpoint.js"
import { cloudflareRecordCreateEndpoint } from "./endpoint/cloudflareRecordCreateEndpoint.js"
import { cloudflareRecordDeleteEndpoint } from "./endpoint/cloudflareRecordDeleteEndpoint.js"
import { cloudflareRecordEditEndpoint } from "./endpoint/cloudflareRecordEditEndpoint.js"
import { cloudflareRecordListEndpoint } from "./endpoint/cloudflareRecordListEndpoint.js"
import { cloudflareZoneGetEndpoint } from "./endpoint/cloudflareZoneGetEndpoint.js"
import { cloudflareZoneSettingsGetEndpoint } from "./endpoint/cloudflareZoneSettingsGetEndpoint.js"
import { cloudflareZoneSettingsSetEndpoint } from "./endpoint/cloudflareZoneSettingsSetEndpoint.js"

export const cloudflareCommand = buildRouteMap({
  routes: {
    connect: cliEndpointCommandCreate(cloudflareConnectEndpoint),
    disconnect: cliEndpointCommandCreate(cloudflareDisconnectEndpoint),
    connection: buildRouteMap({
      routes: {
        get: cliEndpointCommandCreate(cloudflareConnectionGetEndpoint),
      },
      docs: { brief: "Manage connection" },
    }),
    inventory: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(cloudflareInventoryListEndpoint),
      },
      docs: { brief: "Manage inventory" },
    }),
    queue: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(cloudflareQueueListEndpoint),
      },
      docs: { brief: "Manage queue" },
    }),
    move: buildRouteMap({
      routes: {
        get: cliEndpointCommandCreate(cloudflareMoveGetEndpoint),
        retry: cliEndpointCommandCreate(cloudflareMoveRetryEndpoint),
        rollback: cliEndpointCommandCreate(cloudflareMoveRollbackEndpoint),
        preview: cliEndpointCommandCreate(cloudflareMovePreviewEndpoint),
      },
      docs: { brief: "Manage move" },
    }),
    proxy: buildRouteMap({
      routes: {
        set: cliEndpointCommandCreate(cloudflareProxySetEndpoint),
      },
      docs: { brief: "Manage proxy" },
    }),
    record: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(cloudflareRecordListEndpoint),
        create: cliEndpointCommandCreate(cloudflareRecordCreateEndpoint),
        edit: cliEndpointCommandCreate(cloudflareRecordEditEndpoint),
        delete: cliEndpointCommandCreate(cloudflareRecordDeleteEndpoint),
      },
      docs: { brief: "Manage record" },
    }),
    zone: buildRouteMap({
      routes: {
        get: cliEndpointCommandCreate(cloudflareZoneGetEndpoint),
        settingsGet: cliEndpointCommandCreate(cloudflareZoneSettingsGetEndpoint),
        settingsSet: cliEndpointCommandCreate(cloudflareZoneSettingsSetEndpoint),
      },
      docs: { brief: "Manage zone" },
    }),
  },
  docs: { brief: "Manage Cloudflare" },
})
