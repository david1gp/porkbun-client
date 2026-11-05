import * as a from "valibot"

export const porkbunIpResponseSchema = a.looseObject({
  status: a.string(),
  yourIp: a.string(),
  xForwardedFor: a.optional(a.string()),
})
export type PorkbunIpResponse = a.InferOutput<typeof porkbunIpResponseSchema>
