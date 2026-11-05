import * as a from "valibot"
export const wordPressSiteSchema = a.looseObject({
  siteId: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
  phpVersion: a.optional(a.nullable(a.string())),
  availablePhpVersions: a.optional(a.nullable(a.array(a.string()))),
  wordPressVersion: a.optional(a.nullable(a.string())),
  ssl: a.optional(
    a.nullable(a.looseObject({ issued: a.optional(a.boolean()), expiresAt: a.optional(a.nullable(a.string())) })),
  ),
  storage: a.optional(
    a.nullable(
      a.looseObject({
        usedBytes: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        quotaBytes: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
        percentUsed: a.optional(a.nullable(a.number())),
        note: a.optional(a.string()),
      }),
    ),
  ),
  searchVisibility: a.optional(
    a.nullable(
      a.looseObject({ visible: a.optional(a.nullable(a.boolean())), checkedAt: a.optional(a.nullable(a.string())) }),
    ),
  ),
  staging: a.optional(
    a.nullable(
      a.looseObject({
        url: a.optional(a.nullable(a.string())),
        status: a.optional(a.string()),
        operation: a.optional(a.nullable(a.string())),
        operationState: a.optional(a.nullable(a.string())),
      }),
    ),
  ),
  operations: a.optional(
    a.nullable(
      a.array(
        a.looseObject({
          id: a.optional(a.pipe(a.number(), a.integer())),
          type: a.optional(a.picklist(["restore", "factory_reset", "copy_site"])),
          target: a.optional(a.string()),
          state: a.optional(a.picklist(["queued", "running", "done", "failed", "waiting_for_plan"])),
          createdAt: a.optional(a.string()),
          updatedAt: a.optional(a.nullable(a.string())),
          error: a.optional(a.nullable(a.string())),
        }),
      ),
    ),
  ),
})
