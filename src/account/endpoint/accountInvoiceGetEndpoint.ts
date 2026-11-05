import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountInvoiceGetEndpoint = porkbunEndpointDefine({
  op: "accountInvoiceGet",
  method: "GET",
  path: "/account/invoice/{orderId}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get an invoice",
  inputSchema: a.object({
    orderId: a.pipe(
      a.pipe(a.number(), a.integer()),
      a.description("Invoice (order) ID, from `GET /account/invoices`."),
    ),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    invoice: a.optional(
      a.looseObject({
        id: a.optional(a.pipe(a.number(), a.integer())),
        date: a.optional(a.string()),
        state: a.optional(a.picklist(["PAID", "PARTIALLY_REFUNDED", "REFUNDED", "UNPAID"])),
        billTo: a.optional(
          a.looseObject({
            company: a.optional(a.nullable(a.string())),
            name: a.optional(a.nullable(a.string())),
            address: a.optional(a.nullable(a.string())),
            vat: a.optional(a.nullable(a.string())),
          }),
        ),
        paymentMethods: a.optional(a.array(a.string())),
        items: a.optional(
          a.array(
            a.looseObject({
              domain: a.optional(a.string()),
              product: a.optional(a.string()),
              type: a.optional(a.string()),
              years: a.optional(a.nullable(a.pipe(a.number(), a.integer()))),
              expires: a.optional(a.nullable(a.string())),
              status: a.optional(a.picklist(["SUCCESS", "NOT_PROCESSED", "REFUNDED", "REFUND", "COUPON"])),
              price_cents: a.optional(a.pipe(a.number(), a.integer())),
              discount_cents: a.optional(a.pipe(a.number(), a.integer())),
              tags: a.optional(a.array(a.string())),
            }),
          ),
        ),
        gross_cents: a.optional(a.pipe(a.number(), a.integer())),
        refunded_cents: a.optional(a.pipe(a.number(), a.integer())),
        total_cents: a.optional(a.pipe(a.number(), a.integer())),
        total: a.optional(a.string()),
        currency: a.optional(a.string()),
        url: a.optional(a.nullable(a.string())),
        pdfUrl: a.optional(a.nullable(a.string())),
        downloadUrl: a.optional(a.nullable(a.string())),
        downloadExpires: a.optional(a.nullable(a.string())),
      }),
    ),
  }),
})
export type AccountInvoiceGetInput = PorkbunEndpointInput<typeof accountInvoiceGetEndpoint>
export type AccountInvoiceGetResponse = PorkbunEndpointOutput<typeof accountInvoiceGetEndpoint>
