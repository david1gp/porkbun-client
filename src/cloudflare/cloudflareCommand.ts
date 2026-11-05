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
    getConnection: cliEndpointCommandCreate(cloudflareConnectionGetEndpoint),
    inventory: cliEndpointCommandCreate(cloudflareInventoryListEndpoint),
    connect: cliEndpointCommandCreate(cloudflareConnectEndpoint),
    getQueue: cliEndpointCommandCreate(cloudflareQueueListEndpoint),
    get: cliEndpointCommandCreate(cloudflareMoveGetEndpoint),
    retry: cliEndpointCommandCreate(cloudflareMoveRetryEndpoint),
    rollback: cliEndpointCommandCreate(cloudflareMoveRollbackEndpoint),
    disconnect: cliEndpointCommandCreate(cloudflareDisconnectEndpoint),
    setProxy: cliEndpointCommandCreate(cloudflareProxySetEndpoint),
    getRecords: cliEndpointCommandCreate(cloudflareRecordListEndpoint),
    preview: cliEndpointCommandCreate(cloudflareMovePreviewEndpoint),
    getZone: cliEndpointCommandCreate(cloudflareZoneGetEndpoint),
    getZoneSettings: cliEndpointCommandCreate(cloudflareZoneSettingsGetEndpoint),
    setZoneSettings: cliEndpointCommandCreate(cloudflareZoneSettingsSetEndpoint),
    createRecord: cliEndpointCommandCreate(cloudflareRecordCreateEndpoint),
    editRecord: cliEndpointCommandCreate(cloudflareRecordEditEndpoint),
    deleteRecord: cliEndpointCommandCreate(cloudflareRecordDeleteEndpoint),
  },
  docs: { brief: "Manage cloudflare" },
})
