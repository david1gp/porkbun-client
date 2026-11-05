import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { cliOptionCreate } from "../cli/cliOptionCreate.js"
import { hostingAutoRenewUpdateEndpoint } from "./endpoint/hostingAutoRenewUpdateEndpoint.js"
import { hostingBackupCreateEndpoint } from "./endpoint/hostingBackupCreateEndpoint.js"
import { hostingBackupDeleteEndpoint } from "./endpoint/hostingBackupDeleteEndpoint.js"
import { hostingBackupListEndpoint } from "./endpoint/hostingBackupListEndpoint.js"
import { hostingBackupRestoreEndpoint } from "./endpoint/hostingBackupRestoreEndpoint.js"
import { hostingCreateEndpoint } from "./endpoint/hostingCreateEndpoint.js"
import { hostingDeleteEndpoint } from "./endpoint/hostingDeleteEndpoint.js"
import { hostingDirCreateEndpoint } from "./endpoint/hostingDirCreateEndpoint.js"
import { hostingFileDeleteEndpoint } from "./endpoint/hostingFileDeleteEndpoint.js"
import { hostingFileListEndpoint } from "./endpoint/hostingFileListEndpoint.js"
import { hostingGetEndpoint } from "./endpoint/hostingGetEndpoint.js"
import { hostingPhpVersionSetEndpoint } from "./endpoint/hostingPhpVersionSetEndpoint.js"
import { hostingPlanListEndpoint } from "./endpoint/hostingPlanListEndpoint.js"
import { hostingSearchVisibilitySetEndpoint } from "./endpoint/hostingSearchVisibilitySetEndpoint.js"
import { hostingSslReissueEndpoint } from "./endpoint/hostingSslReissueEndpoint.js"
import { hostingStagingCreateEndpoint } from "./endpoint/hostingStagingCreateEndpoint.js"
import { hostingStagingDeleteEndpoint } from "./endpoint/hostingStagingDeleteEndpoint.js"
import { hostingStagingEnvironmentSetEndpoint } from "./endpoint/hostingStagingEnvironmentSetEndpoint.js"
import { hostingStagingGateSetEndpoint } from "./endpoint/hostingStagingGateSetEndpoint.js"
import { hostingStagingGetEndpoint } from "./endpoint/hostingStagingGetEndpoint.js"
import { hostingStagingGuardSetEndpoint } from "./endpoint/hostingStagingGuardSetEndpoint.js"
import { hostingStagingPublishEndpoint } from "./endpoint/hostingStagingPublishEndpoint.js"
import { hostingStagingResetEndpoint } from "./endpoint/hostingStagingResetEndpoint.js"
import { hostingWordPressVersionSetEndpoint } from "./endpoint/hostingWordPressVersionSetEndpoint.js"
import { hostingWpCredentialCreateEndpoint } from "./endpoint/hostingWpCredentialCreateEndpoint.js"
import { hostingWpCredentialDeleteEndpoint } from "./endpoint/hostingWpCredentialDeleteEndpoint.js"
import { hostingWpCredentialListEndpoint } from "./endpoint/hostingWpCredentialListEndpoint.js"
import { hostingFileDeployCommand } from "./hostingFileDeployCommand.js"
export const hostingCommand = buildRouteMap({
  routes: {
    planList: cliEndpointCommandCreate(hostingPlanListEndpoint),
    create: cliEndpointCommandCreate(hostingCreateEndpoint, {
      // The SKU union is a scalar, not JSON; validate the raw CLI string.
      extraFlags: {
        sku: cliOptionCreate(hostingCreateEndpoint.inputSchema.entries.sku, "Provisionable SKU from hosting plan-list"),
      },
    }),
    get: cliEndpointCommandCreate(hostingGetEndpoint),
    delete: cliEndpointCommandCreate(hostingDeleteEndpoint),
    autoRenewUpdate: cliEndpointCommandCreate(hostingAutoRenewUpdateEndpoint),
    phpVersionSet: cliEndpointCommandCreate(hostingPhpVersionSetEndpoint),
    wordpressVersionSet: cliEndpointCommandCreate(hostingWordPressVersionSetEndpoint),
    sslReissue: cliEndpointCommandCreate(hostingSslReissueEndpoint),
    searchVisibilitySet: cliEndpointCommandCreate(hostingSearchVisibilitySetEndpoint),
    file: buildRouteMap({
      routes: {
        deploy: hostingFileDeployCommand,
        list: cliEndpointCommandCreate(hostingFileListEndpoint),
        delete: cliEndpointCommandCreate(hostingFileDeleteEndpoint),
        dirCreate: cliEndpointCommandCreate(hostingDirCreateEndpoint),
      },
      docs: { brief: "Manage files" },
    }),
    wpCredential: buildRouteMap({
      routes: {
        create: cliEndpointCommandCreate(hostingWpCredentialCreateEndpoint),
        list: cliEndpointCommandCreate(hostingWpCredentialListEndpoint),
        delete: cliEndpointCommandCreate(hostingWpCredentialDeleteEndpoint),
      },
      docs: { brief: "Manage WordPress credentials" },
    }),
    backup: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(hostingBackupListEndpoint),
        create: cliEndpointCommandCreate(hostingBackupCreateEndpoint),
        delete: cliEndpointCommandCreate(hostingBackupDeleteEndpoint),
        restore: cliEndpointCommandCreate(hostingBackupRestoreEndpoint),
      },
      docs: { brief: "Manage backups" },
    }),
    staging: buildRouteMap({
      routes: {
        get: cliEndpointCommandCreate(hostingStagingGetEndpoint),
        create: cliEndpointCommandCreate(hostingStagingCreateEndpoint),
        reset: cliEndpointCommandCreate(hostingStagingResetEndpoint),
        publish: cliEndpointCommandCreate(hostingStagingPublishEndpoint),
        delete: cliEndpointCommandCreate(hostingStagingDeleteEndpoint),
        gateSet: cliEndpointCommandCreate(hostingStagingGateSetEndpoint),
        guardSet: cliEndpointCommandCreate(hostingStagingGuardSetEndpoint),
        environmentSet: cliEndpointCommandCreate(hostingStagingEnvironmentSetEndpoint),
      },
      docs: { brief: "Manage staging" },
    }),
  },
  docs: { brief: "Manage hosting" },
})
