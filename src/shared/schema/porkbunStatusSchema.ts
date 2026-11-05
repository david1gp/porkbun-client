import * as a from "valibot"

export const porkbunStatusSchema = a.picklist(["SUCCESS", "ERROR"])
export type PorkbunStatus = a.InferOutput<typeof porkbunStatusSchema>
