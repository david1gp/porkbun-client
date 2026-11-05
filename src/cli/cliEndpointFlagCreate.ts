import type { Command } from "@stricli/core"
import * as a from "valibot"
import type { CliCommandContext } from "./cliCommandContext.js"
import { cliOptionCreate } from "./cliOptionCreate.js"
import { cliOptionSchemas } from "./cliOptionSchemas.js"
import { cliSchemaInspect } from "./cliSchemaInspect.js"

type Flag = NonNullable<Command<CliCommandContext>["parameters"]["flags"]>[string]

export function cliEndpointFlagCreate(entrySchema: a.GenericSchema, name: string): Flag {
  const inspected = cliSchemaInspect(entrySchema)
  const schema = inspected.schema
  const configuration = { brief: inspected.brief ?? name, optional: inspected.optional }
  if (schema.type === "boolean") return { ...configuration, kind: "boolean" } as Flag
  if (schema.type === "string")
    return cliOptionCreate(a.string(), configuration.brief, { optional: configuration.optional })
  if (schema.type === "number") {
    const integer = schema.pipe?.some((action) => action.type === "integer")
    return cliOptionCreate(integer ? cliOptionSchemas.integer : cliOptionSchemas.number, configuration.brief, {
      optional: configuration.optional,
    })
  }
  if (
    (schema.type === "picklist" || schema.type === "enum") &&
    schema.options?.every((option) => typeof option === "string")
  ) {
    return { ...configuration, kind: "enum", values: schema.options as readonly string[] }
  }
  if (schema.type === "array" && schema.item !== undefined) {
    const item = cliSchemaInspect(schema.item).schema
    if (
      ["string", "picklist", "enum"].includes(item.type) &&
      (item.options === undefined || item.options.every((option) => typeof option === "string"))
    ) {
      return { ...configuration, kind: "parsed", variadic: true, parse: (input: string) => input }
    }
  }
  // Stricli parsers must throw on invalid text. cliApplicationText converts this
  // framework boundary exception into the normal JSON ResultErr contract.
  return cliOptionCreate(a.pipe(a.string(), a.parseJson(), entrySchema), configuration.brief, {
    optional: configuration.optional,
  })
}
