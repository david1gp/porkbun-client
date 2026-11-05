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
    preflight: cliEndpointCommandCreate(dnsPreflightEndpoint),
    scan: cliEndpointCommandCreate(dnsScanEndpoint),
    import: cliEndpointCommandCreate(dnsImportEndpoint),
    record: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(dnsRecordListEndpoint),
        get: cliEndpointCommandCreate(dnsRecordGetEndpoint),
        listByNameType: cliEndpointCommandCreate(dnsRecordListByNameTypeEndpoint),
        create: cliEndpointCommandCreate(dnsRecordCreateEndpoint),
        edit: cliEndpointCommandCreate(dnsRecordEditEndpoint),
        editByNameType: cliEndpointCommandCreate(dnsRecordEditByNameTypeEndpoint),
        delete: cliEndpointCommandCreate(dnsRecordDeleteEndpoint),
        deleteByNameType: cliEndpointCommandCreate(dnsRecordDeleteByNameTypeEndpoint),
      },
      docs: { brief: "Manage record" },
    }),
    history: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(dnsHistoryListEndpoint),
        diff: cliEndpointCommandCreate(dnsHistoryDiffEndpoint),
        restore: cliEndpointCommandCreate(dnsHistoryRestoreEndpoint),
      },
      docs: { brief: "Manage history" },
    }),
  },
  docs: { brief: "Manage DNS" },
})
