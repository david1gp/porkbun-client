import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const accountInvoiceListEndpoint = porkbunEndpointDefine({
  op: "accountInvoiceList",
  method: "GET",
  path: "/account/invoices",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List invoices",
  inputSchema: a.object({
    year: a.optional(
      a.pipe(a.pipe(a.number(), a.integer()), a.description("Only invoices from this year, e.g. 2026.")),
    ),
    start: a.optional(a.pipe(a.pipe(a.number(), a.integer()), a.description("Offset for paging."))),
    limit: a.optional(a.pipe(a.number(), a.integer(), a.minValue(1), a.maxValue(100))),
  }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    invoices: a.optional(
      a.array(
        a.looseObject({
          id: a.optional(a.pipe(a.number(), a.integer())),
          date: a.optional(a.string()),
          state: a.optional(a.picklist(["PAID", "PARTIALLY_REFUNDED", "REFUNDED", "UNPAID"])),
          total_cents: a.optional(a.pipe(a.number(), a.integer())),
          total: a.optional(a.string()),
          itemCount: a.optional(a.pipe(a.number(), a.integer())),
          domains: a.optional(a.array(a.string())),
          url: a.optional(a.nullable(a.string())),
        }),
      ),
    ),
    total: a.optional(a.pipe(a.number(), a.integer())),
    start: a.optional(a.pipe(a.number(), a.integer())),
    limit: a.optional(a.pipe(a.number(), a.integer())),
    years: a.optional(a.array(a.pipe(a.number(), a.integer()))),
  }),
})
export type AccountInvoiceListInput = PorkbunEndpointInput<typeof accountInvoiceListEndpoint>
export type AccountInvoiceListResponse = PorkbunEndpointOutput<typeof accountInvoiceListEndpoint>
