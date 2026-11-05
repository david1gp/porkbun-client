import * as a from "valibot"

export const porkbunPayWithSchema = a.picklist(["usdc", "card"])
export type PorkbunPayWith = a.InferOutput<typeof porkbunPayWithSchema>
