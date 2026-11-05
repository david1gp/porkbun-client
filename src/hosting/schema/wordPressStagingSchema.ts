import * as a from "valibot"
export const wordPressStagingSchema = a.looseObject({
  url: a.optional(a.nullable(a.string())),
  status: a.optional(a.string()),
  operation: a.optional(a.nullable(a.string())),
  operationState: a.optional(a.nullable(a.string())),
  builtFromBackup: a.optional(
    a.nullable(a.looseObject({ files: a.optional(a.string()), database: a.optional(a.string()) })),
  ),
  passwordProtection: a.optional(
    a.looseObject({ enabled: a.optional(a.boolean()), password: a.optional(a.nullable(a.string())) }),
  ),
  outbound: a.optional(
    a.looseObject({
      guardInstalled: a.optional(a.boolean()),
      blockEmail: a.optional(a.nullable(a.boolean())),
      blockApiRequests: a.optional(a.nullable(a.boolean())),
    }),
  ),
  environment: a.optional(a.string()),
  ssl: a.optional(a.nullable(a.looseObject({ issued: a.optional(a.boolean()) }))),
  createdAt: a.optional(a.string()),
})
