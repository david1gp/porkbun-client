import * as a from "valibot"
import { linkInBioSchema } from "./linkInBioSchema.js"

export const linkInBioResponseSchema = a.looseObject({
  status: a.optional(a.string()),
  linkInBio: a.optional(linkInBioSchema),
})
