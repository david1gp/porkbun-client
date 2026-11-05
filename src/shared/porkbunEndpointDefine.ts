import type * as a from "valibot"
import type { PorkbunEndpoint } from "./PorkbunEndpoint.js"

type PathKeys<Path extends string> = Path extends `${string}{${infer Key}}${infer Rest}` ? Key | PathKeys<Rest> : never

/** Invalid path placeholders are a compile-time error, not an untyped URL bug. */
export function porkbunEndpointDefine<
  const TInput extends a.GenericSchema<Record<string, unknown>, Record<string, unknown>> & {
    readonly entries: a.ObjectEntries
  },
  const TResponse extends a.GenericSchema,
  const TPath extends string,
>(
  endpoint: PorkbunEndpoint<TInput, TResponse, TPath> &
    (Exclude<PathKeys<TPath>, keyof TInput["entries"]> extends never
      ? unknown
      : { readonly invalidPathParameter: never }),
): PorkbunEndpoint<TInput, TResponse, TPath> {
  return endpoint
}
