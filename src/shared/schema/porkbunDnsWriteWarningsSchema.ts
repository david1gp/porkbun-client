import * as a from "valibot"

export const porkbunDnsWriteWarningsSchema = a.array(a.string())
export type PorkbunDnsWriteWarnings = a.InferOutput<typeof porkbunDnsWriteWarningsSchema>
