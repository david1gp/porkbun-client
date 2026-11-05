import * as a from "valibot"
export const cloudflareZoneSettingsSchema = a.looseObject({
  ssl: a.optional(a.picklist(["off", "flexible", "full", "strict"])),
  always_use_https: a.optional(a.picklist(["on", "off"])),
  automatic_https_rewrites: a.optional(a.picklist(["on", "off"])),
  min_tls_version: a.optional(a.picklist(["1.0", "1.1", "1.2", "1.3"])),
  development_mode: a.optional(a.picklist(["on", "off"])),
  cache_level: a.optional(a.picklist(["aggressive", "basic", "simplified"])),
})
