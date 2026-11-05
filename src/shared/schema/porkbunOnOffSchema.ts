import * as a from "valibot"

export const porkbunOnOffSchema = a.picklist(["on", "off"])
export type PorkbunOnOff = a.InferOutput<typeof porkbunOnOffSchema>
