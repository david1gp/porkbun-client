import * as a from "valibot"

export const porkbunCentsSchema = a.pipe(a.number(), a.integer(), a.minValue(0))
export type PorkbunCents = a.InferOutput<typeof porkbunCentsSchema>
