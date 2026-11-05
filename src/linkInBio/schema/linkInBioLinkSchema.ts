import * as a from "valibot"

export const linkInBioLinkSchema = a.looseObject({
  id: a.optional(a.pipe(a.number(), a.integer())),
  type: a.optional(a.picklist(["link", "featured", "category"])),
  title: a.optional(a.string()),
  url: a.optional(a.nullable(a.string())),
  enabled: a.optional(a.boolean()),
  position: a.optional(a.pipe(a.number(), a.integer())),
  startDate: a.optional(a.nullable(a.string())),
  endDate: a.optional(a.nullable(a.string())),
  animation: a.optional(a.nullable(a.picklist(["pulse", "bounce", "shake"]))),
  protection: a.optional(
    a.nullable(
      a.looseObject({
        type: a.optional(a.picklist(["code", "birthday", "sensitive"])),
        value: a.optional(a.nullable(a.string())),
        explanation: a.optional(a.nullable(a.string())),
      }),
    ),
  ),
  imageUrl: a.optional(a.nullable(a.string())),
})
