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
    updateProfile: cliEndpointCommandCreate(linkInBioProfileUpdateEndpoint),
    addLink: cliEndpointCommandCreate(linkInBioLinkCreateEndpoint),
    editLink: cliEndpointCommandCreate(linkInBioLinkEditEndpoint),
    deleteLink: cliEndpointCommandCreate(linkInBioLinkDeleteEndpoint),
    reorderLinks: cliEndpointCommandCreate(linkInBioLinkReorderEndpoint),
    updateSocials: cliEndpointCommandCreate(linkInBioSocialsUpdateEndpoint),
    updateAppearance: cliEndpointCommandCreate(linkInBioAppearanceUpdateEndpoint),
    updateSettings: cliEndpointCommandCreate(linkInBioSettingsUpdateEndpoint),
  },
  docs: { brief: "Manage linkInBio" },
})
