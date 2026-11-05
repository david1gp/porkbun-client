import * as a from "valibot"
import { linkInBioLinkSchema } from "./linkInBioLinkSchema.js"
import { linkInBioSchema } from "./linkInBioSchema.js"

export const linkInBioLinkResponseSchema = a.looseObject({
  status: a.optional(a.string()),
  link: a.optional(linkInBioLinkSchema),
  linkInBio: a.optional(linkInBioSchema),
})
