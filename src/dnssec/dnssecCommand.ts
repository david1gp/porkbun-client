import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { dnssecRecordCreateEndpoint } from "./endpoint/dnssecRecordCreateEndpoint.js"
import { dnssecRecordDeleteEndpoint } from "./endpoint/dnssecRecordDeleteEndpoint.js"
import { dnssecRecordListEndpoint } from "./endpoint/dnssecRecordListEndpoint.js"

export const dnssecCommand = buildRouteMap({
  routes: {
    record: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(dnssecRecordListEndpoint),
        create: cliEndpointCommandCreate(dnssecRecordCreateEndpoint),
        delete: cliEndpointCommandCreate(dnssecRecordDeleteEndpoint),
      },
      docs: { brief: "Manage record" },
    }),
  },
  docs: { brief: "Manage DNSSEC" },
})
