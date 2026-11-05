import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountInvoicePdfGetEndpoint = porkbunEndpointDefine({
  op: "accountInvoicePdfGet",
  method: "GET",
  path: "/account/invoicePdf/{orderId}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Download an invoice PDF",
  inputSchema: a.object({
    orderId: a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description("Invoice (order) ID, from `GET /account/invoices`."),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    filename: a.optional(a.string()),
    contentType: a.optional(a.string()),
    sizeBytes: a.optional(a.pipe(a.number(), a.integer())),
    contentBase64: a.optional(a.string()),
    downloadUrl: a.optional(a.nullable(a.string())),
    downloadExpires: a.optional(a.nullable(a.string())),
  }),
})
export type AccountInvoicePdfGetInput = PorkbunEndpointInput<typeof accountInvoicePdfGetEndpoint>
export type AccountInvoicePdfGetResponse = PorkbunEndpointOutput<typeof accountInvoicePdfGetEndpoint>
