import * as a from "valibot"

export const linkInBioLinkInputSchema = a.object({
  type: a.optional(
    a.pipe(
      a.picklist(["link", "featured", "category"]),
      a.description("`link` (default), `featured` or `category` (a heading; no url)."),
    ),
  ),
  title: a.pipe(a.string(), a.description("Up to 255 characters.")),
  url: a.optional(
    a.pipe(
      a.string(),
      a.description("http(s) address, up to 255 characters; a bare host gets https:// added. Not for a category."),
    ),
  ),
  enabled: a.optional(a.pipe(a.boolean(), a.description("Default true."))),
  startDate: a.optional(
    a.pipe(
      a.nullable(a.string()),
      a.description(
        "Show from this time: YYYY-MM-DD, or ISO 8601; UTC unless an offset is given. null clears it. Paid plans.",
      ),
    ),
  ),
  endDate: a.optional(a.pipe(a.nullable(a.string()), a.description("Hide after this time; same format. Paid plans."))),
  animation: a.optional(
    a.pipe(
      a.nullable(a.picklist(["pulse", "bounce", "shake"])),
      a.description("`pulse`, `bounce`, `shake`, or null for none. Paid plans."),
    ),
  ),
  protection: a.optional(
    a.pipe(
      a.nullable(
        a.object({
          type: a.optional(a.pipe(a.picklist(["code", "birthday", "sensitive"]), a.description("type"))),
          value: a.optional(a.pipe(a.string(), a.description("value"))),
          explanation: a.optional(a.pipe(a.string(), a.description("Shown to the visitor, up to 255 characters."))),
        }),
      ),
      a.description(
        "null removes it. `code` (passcode; paid plans) needs value; `birthday` takes value 18, 21 or 25; `sensitive` shows a warning.",
      ),
    ),
  ),
})
