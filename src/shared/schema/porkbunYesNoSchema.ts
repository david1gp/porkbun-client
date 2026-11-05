import * as a from "valibot"

export const porkbunYesNoSchema = a.picklist(["yes", "no"])
export type PorkbunYesNo = a.InferOutput<typeof porkbunYesNoSchema>
