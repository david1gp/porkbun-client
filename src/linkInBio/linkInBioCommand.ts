import { buildRouteMap } from "@stricli/core"
import { cliEndpointCommandCreate } from "../cli/cliEndpointCommandCreate.js"
import { linkInBioAppearanceUpdateEndpoint } from "./endpoint/linkInBioAppearanceUpdateEndpoint.js"
import { linkInBioCreateEndpoint } from "./endpoint/linkInBioCreateEndpoint.js"
import { linkInBioGetEndpoint } from "./endpoint/linkInBioGetEndpoint.js"
import { linkInBioLinkCreateEndpoint } from "./endpoint/linkInBioLinkCreateEndpoint.js"
import { linkInBioLinkDeleteEndpoint } from "./endpoint/linkInBioLinkDeleteEndpoint.js"
import { linkInBioLinkEditEndpoint } from "./endpoint/linkInBioLinkEditEndpoint.js"
import { linkInBioLinkReorderEndpoint } from "./endpoint/linkInBioLinkReorderEndpoint.js"
import { linkInBioProfileUpdateEndpoint } from "./endpoint/linkInBioProfileUpdateEndpoint.js"
import { linkInBioSettingsUpdateEndpoint } from "./endpoint/linkInBioSettingsUpdateEndpoint.js"
import { linkInBioSocialsUpdateEndpoint } from "./endpoint/linkInBioSocialsUpdateEndpoint.js"

export const linkInBioCommand = buildRouteMap({
  routes: {
    get: cliEndpointCommandCreate(linkInBioGetEndpoint),
    create: cliEndpointCommandCreate(linkInBioCreateEndpoint),
    profileUpdate: cliEndpointCommandCreate(linkInBioProfileUpdateEndpoint),
    socialsUpdate: cliEndpointCommandCreate(linkInBioSocialsUpdateEndpoint),
    appearanceUpdate: cliEndpointCommandCreate(linkInBioAppearanceUpdateEndpoint),
    settingsUpdate: cliEndpointCommandCreate(linkInBioSettingsUpdateEndpoint),
    link: buildRouteMap({
      routes: {
        create: cliEndpointCommandCreate(linkInBioLinkCreateEndpoint),
        edit: cliEndpointCommandCreate(linkInBioLinkEditEndpoint),
        delete: cliEndpointCommandCreate(linkInBioLinkDeleteEndpoint),
        reorder: cliEndpointCommandCreate(linkInBioLinkReorderEndpoint),
      },
      docs: { brief: "Manage link" },
    }),
  },
  docs: { brief: "Manage link-in-bio pages" },
})
