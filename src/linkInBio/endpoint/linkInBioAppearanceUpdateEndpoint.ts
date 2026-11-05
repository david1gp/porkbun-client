import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { linkInBioResponseSchema } from "../schema/linkInBioResponseSchema.js"

export const linkInBioAppearanceUpdateEndpoint = porkbunEndpointDefine({
  op: "linkInBioAppearanceUpdate",
  method: "POST",
  path: "/linkinbio/updateAppearance/{domain}",
  auth: "required",
  scope: "hosting",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Update the page appearance",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("domain")),
    preset: a.optional(
      a.pipe(a.picklist(["classic", "ocean", "midnight", "paper", "forest", "sunset"]), a.description("preset")),
    ),
    fontFamily: a.optional(
      a.pipe(a.picklist(["inter", "poppins", "lora", "mono", "serif"]), a.description("fontFamily")),
    ),
    buttonStyle: a.optional(
      a.pipe(a.picklist(["classic", "pill", "floating", "hardShadow"]), a.description("buttonStyle")),
    ),
    radius: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Button corner radius in pixels, 0-50."))),
    pageBackgroundMode: a.optional(
      a.pipe(
        a.picklist(["solid", "gradient"]),
        a.description("`gradient` blends pageBackgroundColor into pageBackgroundColor2."),
      ),
    ),
    textAlign: a.optional(a.pipe(a.picklist(["left", "center", "right"]), a.description("textAlign"))),
    pageBackgroundColor: a.optional(a.pipe(a.string(), a.description("Hex colour, e.g. #1b5a8a."))),
    pageBackgroundColor2: a.optional(a.pipe(a.string(), a.description("Hex colour, e.g. #1b5a8a."))),
    pageColor: a.optional(a.pipe(a.string(), a.description("Hex colour, e.g. #1b5a8a."))),
    boxBackgroundColor: a.optional(a.pipe(a.string(), a.description("Hex colour, e.g. #1b5a8a."))),
    borderColor: a.optional(a.pipe(a.string(), a.description("Hex colour, e.g. #1b5a8a."))),
  }),
  responseSchema: linkInBioResponseSchema,
})
export type LinkInBioAppearanceUpdateInput = PorkbunEndpointInput<typeof linkInBioAppearanceUpdateEndpoint>
export type LinkInBioAppearanceUpdateResponse = PorkbunEndpointOutput<typeof linkInBioAppearanceUpdateEndpoint>
