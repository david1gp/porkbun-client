import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { dnssecRecordCreateEndpoint } from "./endpoint/dnssecRecordCreateEndpoint.js"
import { dnssecRecordDeleteEndpoint } from "./endpoint/dnssecRecordDeleteEndpoint.js"
import { dnssecRecordListEndpoint } from "./endpoint/dnssecRecordListEndpoint.js"

export const dnssecCommand = buildRouteMap({
  routes: {
    recordList: cliEndpointCommandCreate(dnssecRecordListEndpoint),
    recordCreate: cliEndpointCommandCreate(dnssecRecordCreateEndpoint),
    recordDelete: cliEndpointCommandCreate(dnssecRecordDeleteEndpoint),
  },
  docs: { brief: "Manage DNSSEC" },
})
