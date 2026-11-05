import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { domainAutoRenewUpdateEndpoint } from "./endpoint/domainAutoRenewUpdateEndpoint.js"
import { domainCheckBulkEndpoint } from "./endpoint/domainCheckBulkEndpoint.js"
import { domainCheckEndpoint } from "./endpoint/domainCheckEndpoint.js"
import { domainContactListEndpoint } from "./endpoint/domainContactListEndpoint.js"
import { domainContactUpdateEndpoint } from "./endpoint/domainContactUpdateEndpoint.js"
import { domainCreateEndpoint } from "./endpoint/domainCreateEndpoint.js"
import { domainGetEndpoint } from "./endpoint/domainGetEndpoint.js"
import { domainListEndpoint } from "./endpoint/domainListEndpoint.js"
import { domainNameserverListEndpoint } from "./endpoint/domainNameserverListEndpoint.js"
import { domainNameserverUpdateEndpoint } from "./endpoint/domainNameserverUpdateEndpoint.js"
import { domainRegistrationRequirementsGetEndpoint } from "./endpoint/domainRegistrationRequirementsGetEndpoint.js"
import { domainRenewEndpoint } from "./endpoint/domainRenewEndpoint.js"

export const domainCommand = buildRouteMap({
  routes: {
    check: cliEndpointCommandCreate(domainCheckEndpoint),
    checkBulk: cliEndpointCommandCreate(domainCheckBulkEndpoint),
    create: cliEndpointCommandCreate(domainCreateEndpoint),
    renew: cliEndpointCommandCreate(domainRenewEndpoint),
    list: cliEndpointCommandCreate(domainListEndpoint),
    get: cliEndpointCommandCreate(domainGetEndpoint),
    autoRenewUpdate: cliEndpointCommandCreate(domainAutoRenewUpdateEndpoint),
    registrationRequirementsGet: cliEndpointCommandCreate(domainRegistrationRequirementsGetEndpoint),
    nameserver: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(domainNameserverListEndpoint),
        update: cliEndpointCommandCreate(domainNameserverUpdateEndpoint),
      },
      docs: { brief: "Manage nameserver" },
    }),
    contact: buildRouteMap({
      routes: {
        list: cliEndpointCommandCreate(domainContactListEndpoint),
        update: cliEndpointCommandCreate(domainContactUpdateEndpoint),
      },
      docs: { brief: "Manage contact" },
    }),
  },
  docs: { brief: "Manage domains" },
})
