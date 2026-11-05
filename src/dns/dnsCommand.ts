import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { dnsHistoryDiffEndpoint } from "./endpoint/dnsHistoryDiffEndpoint.js"
import { dnsHistoryListEndpoint } from "./endpoint/dnsHistoryListEndpoint.js"
import { dnsHistoryRestoreEndpoint } from "./endpoint/dnsHistoryRestoreEndpoint.js"
import { dnsImportEndpoint } from "./endpoint/dnsImportEndpoint.js"
import { dnsPreflightEndpoint } from "./endpoint/dnsPreflightEndpoint.js"
import { dnsRecordCreateEndpoint } from "./endpoint/dnsRecordCreateEndpoint.js"
import { dnsRecordDeleteByNameTypeEndpoint } from "./endpoint/dnsRecordDeleteByNameTypeEndpoint.js"
import { dnsRecordDeleteEndpoint } from "./endpoint/dnsRecordDeleteEndpoint.js"
import { dnsRecordEditByNameTypeEndpoint } from "./endpoint/dnsRecordEditByNameTypeEndpoint.js"
import { dnsRecordEditEndpoint } from "./endpoint/dnsRecordEditEndpoint.js"
import { dnsRecordGetEndpoint } from "./endpoint/dnsRecordGetEndpoint.js"
import { dnsRecordListByNameTypeEndpoint } from "./endpoint/dnsRecordListByNameTypeEndpoint.js"
import { dnsRecordListEndpoint } from "./endpoint/dnsRecordListEndpoint.js"
import { dnsScanEndpoint } from "./endpoint/dnsScanEndpoint.js"

export const dnsCommand = buildRouteMap({
  routes: {
    recordList: cliEndpointCommandCreate(dnsRecordListEndpoint),
    recordGet: cliEndpointCommandCreate(dnsRecordGetEndpoint),
    recordListByNameType: cliEndpointCommandCreate(dnsRecordListByNameTypeEndpoint),
    recordCreate: cliEndpointCommandCreate(dnsRecordCreateEndpoint),
    recordEdit: cliEndpointCommandCreate(dnsRecordEditEndpoint),
    recordEditByNameType: cliEndpointCommandCreate(dnsRecordEditByNameTypeEndpoint),
    recordDelete: cliEndpointCommandCreate(dnsRecordDeleteEndpoint),
    recordDeleteByNameType: cliEndpointCommandCreate(dnsRecordDeleteByNameTypeEndpoint),
    preflight: cliEndpointCommandCreate(dnsPreflightEndpoint),
    historyList: cliEndpointCommandCreate(dnsHistoryListEndpoint),
    historyDiff: cliEndpointCommandCreate(dnsHistoryDiffEndpoint),
    historyRestore: cliEndpointCommandCreate(dnsHistoryRestoreEndpoint),
    scan: cliEndpointCommandCreate(dnsScanEndpoint),
    import: cliEndpointCommandCreate(dnsImportEndpoint),
  },
  docs: { brief: "Manage DNS" },
})
