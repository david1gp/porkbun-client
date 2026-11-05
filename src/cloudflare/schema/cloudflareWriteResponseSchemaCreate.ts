import * as a from "valibot"

/**
 * Cloudflare's OpenAPI responses are unspecified objects; MCP confirms that a
 * dry run previews the same per-domain/record/setting result without writing.
 * The live mock returns {} even for dryRun=true, so success fields stay optional.
 * Keep the preview flag typed rather than relying on looseObject passthrough.
 */
export function cloudflareWriteResponseSchemaCreate<T extends a.ObjectEntries>(entries: T) {
  return a.union([
    a.looseObject({ ...entries, dryRun: a.optional(a.literal(false)) }),
    a.looseObject({
      ...entries,
      dryRun: a.literal(true),
      wouldSucceed: a.optional(a.boolean()),
    }),
  ])
}
