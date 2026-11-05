import type * as a from "valibot"
import type { PorkbunEndpoint } from "./PorkbunEndpoint.js"

type PathKeys<Path extends string, Optional extends boolean> = Path extends `${string}{${infer Key}}${infer Rest}`
  ? Key extends `${infer Name}?`
    ? (Optional extends true ? Name : never) | PathKeys<Rest, Optional>
    : (Optional extends false ? Key : never) | PathKeys<Rest, Optional>
  : never

type OptionalKeys<Input> = { [Key in keyof Input]-?: undefined extends Input[Key] ? Key : never }[keyof Input]

type TrailingOptional<Path extends string> = Path extends `${string}/{${string}?}${infer Rest}`
  ? Rest extends ""
    ? true
    : Rest extends `/{${string}?}${string}`
      ? TrailingOptional<Rest>
      : false
  : Path extends `${string}{${string}?}${string}`
    ? false
    : true

type PathValid<Path extends string, Input> =
  Exclude<PathKeys<Path, true>, OptionalKeys<Input>> extends never
    ? Exclude<PathKeys<Path, false>, Exclude<keyof Input, OptionalKeys<Input>>> extends never
      ? TrailingOptional<Path>
      : false
    : false

/** Invalid path placeholders are a compile-time error, not an untyped URL bug. */
export function porkbunEndpointDefine<
  const TInput extends a.GenericSchema<Record<string, unknown>, Record<string, unknown>> & {
    readonly entries: a.ObjectEntries
  },
  const TResponse extends a.GenericSchema,
  const TPath extends string,
>(
  endpoint: PorkbunEndpoint<TInput, TResponse, TPath> &
    (PathValid<TPath, a.InferInput<TInput>> extends true ? unknown : { readonly invalidPathParameter: never }),
): PorkbunEndpoint<TInput, TResponse, TPath> {
  return endpoint
}
