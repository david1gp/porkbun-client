import * as a from "valibot"
import { linkInBioLinkSchema } from "./linkInBioLinkSchema.js"

export const linkInBioSchema = a.looseObject({
  domain: a.optional(a.string()),
  url: a.optional(a.string()),
  delivery: a.optional(a.picklist(["domain", "l.ink"])),
  plan: a.optional(
    a.looseObject({
      sku: a.optional(a.string()),
      name: a.optional(a.string()),
      free: a.optional(a.boolean()),
      price: a.optional(a.pipe(a.number(), a.integer())),
      interval: a.optional(a.nullable(a.string())),
    }),
  ),
  status: a.optional(a.string()),
  isTrial: a.optional(a.boolean()),
  expireDate: a.optional(a.nullable(a.string())),
  features: a.optional(
    a.looseObject({
      maxLinks: a.optional(a.pipe(a.number(), a.integer())),
      scheduling: a.optional(a.boolean()),
      animation: a.optional(a.boolean()),
      passcodeProtection: a.optional(a.boolean()),
      analyticsIds: a.optional(a.boolean()),
      utmParameters: a.optional(a.boolean()),
      mailingList: a.optional(a.boolean()),
    }),
  ),
  linkCount: a.optional(a.pipe(a.number(), a.integer())),
  profile: a.optional(
    a.looseObject({
      title: a.optional(a.nullable(a.string())),
      bio: a.optional(a.nullable(a.string())),
      avatarUrl: a.optional(a.nullable(a.string())),
    }),
  ),
  links: a.optional(a.array(linkInBioLinkSchema)),
  socials: a.optional(
    a.looseObject({
      location: a.optional(a.picklist(["top", "bottom"])),
      email: a.optional(a.nullable(a.string())),
      instagram: a.optional(a.nullable(a.string())),
      facebook: a.optional(a.nullable(a.string())),
      tiktok: a.optional(a.nullable(a.string())),
      youtube: a.optional(a.nullable(a.string())),
      twitter: a.optional(a.nullable(a.string())),
      linkedin: a.optional(a.nullable(a.string())),
    }),
  ),
  appearance: a.optional(
    a.looseObject({
      preset: a.optional(a.nullable(a.string())),
      fontFamily: a.optional(a.nullable(a.string())),
      buttonStyle: a.optional(a.nullable(a.string())),
      radius: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
      pageBackgroundMode: a.optional(a.nullable(a.string())),
      textAlign: a.optional(a.nullable(a.string())),
      pageBackgroundColor: a.optional(a.nullable(a.string())),
      pageBackgroundColor2: a.optional(a.nullable(a.string())),
      pageColor: a.optional(a.nullable(a.string())),
      boxBackgroundColor: a.optional(a.nullable(a.string())),
      borderColor: a.optional(a.nullable(a.string())),
    }),
  ),
  settings: a.optional(
    a.looseObject({
      sensitiveContent: a.optional(a.nullable(a.string())),
      analytics: a.optional(
        a.looseObject({
          googleAnalyticsId: a.optional(a.nullable(a.string())),
          facebookPixelId: a.optional(a.nullable(a.string())),
          twitterPixelId: a.optional(a.nullable(a.string())),
          tikTokPixelId: a.optional(a.nullable(a.string())),
          utmSource: a.optional(a.nullable(a.string())),
          utmMedium: a.optional(a.nullable(a.string())),
        }),
      ),
      mailingList: a.optional(
        a.looseObject({ enabled: a.optional(a.boolean()), provider: a.optional(a.nullable(a.string())) }),
      ),
    }),
  ),
  editorUrl: a.optional(a.string()),
})
