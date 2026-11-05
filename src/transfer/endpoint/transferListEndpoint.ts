import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunStatusSchema } from "../../shared/schema/porkbunStatusSchema.js"
import { transferItemSchema } from "../schema/transferItemSchema.js"
export const transferListEndpoint = porkbunEndpointDefine({
  op: "transferList",
  method: "GET",
  path: "/domain/listTransfers",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List active transfers",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(porkbunStatusSchema),
    transfers: a.optional(a.array(transferItemSchema)),
  }),
})
export type TransferListInput = PorkbunEndpointInput<typeof transferListEndpoint>
export type TransferListResponse = PorkbunEndpointOutput<typeof transferListEndpoint>
