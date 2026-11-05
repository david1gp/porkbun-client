import type * as a from "valibot"
import type { PorkbunScope } from "./schema/porkbunScopeSchema.js"

/** Object schemas keep entries introspectable by the generic CLI. */
export type PorkbunEndpoint<
  TInput extends a.GenericSchema<Record<string, unknown>, Record<string, unknown>> & {
    readonly entries: a.ObjectEntries
  } = a.GenericSchema<Record<string, unknown>, Record<string, unknown>> & { readonly entries: a.ObjectEntries },
  TResponse extends a.GenericSchema = a.GenericSchema,
  TPath extends string = string,
> = {
  readonly op: string
  readonly method: "GET" | "POST"
  readonly path: TPath
  readonly auth: "required" | "none"
  readonly scope: PorkbunScope
  readonly agent: {
    readonly safe: boolean
    readonly cost: boolean
    readonly destructive: boolean
    readonly reversible: boolean
    readonly requiresConfirmation: boolean
  }
  readonly brief: string
  readonly inputSchema: TInput
  readonly responseSchema: TResponse
  /** OpenAPI query serialization; defaults to form + explode:true. */
  readonly query?: Partial<
    Record<
      keyof a.InferInput<TInput>,
      {
        readonly style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject"
        readonly explode?: boolean
      }
    >
  >
}
