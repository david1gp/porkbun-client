import * as a from "valibot"

type SchemaNode = a.GenericSchema & {
  readonly wrapped?: a.GenericSchema
  readonly item?: a.GenericSchema
  readonly options?: readonly unknown[]
  readonly pipe?: readonly { readonly type: string }[]
}

/** Valibot preserves its schema type on pipes; wrappers need unwrapping. */
export function cliSchemaInspect(schema: a.GenericSchema): { schema: SchemaNode; brief?: string; optional: boolean } {
  let node = schema as SchemaNode
  let brief = a.getDescription(node)
  const optional = a.safeParse(schema, undefined).success
  while (node.wrapped !== undefined) {
    node = node.wrapped as SchemaNode
    brief = brief ?? a.getDescription(node)
  }
  return { schema: node, brief, optional }
}
