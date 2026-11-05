import { writeFile } from "node:fs/promises"
import { buildCommand } from "@stricli/core"
import { createResult, createResultError } from "#result"
import { cliClientCreate } from "../cli/cliClientCreate.js"
import { cliClientOptions } from "../cli/cliClientOptions.js"
import type { CliCommandContext } from "../cli/cliCommandContext.js"
import { cliOptionCreate } from "../cli/cliOptionCreate.js"
import { cliOptionSchemas } from "../cli/cliOptionSchemas.js"
import { cliResultWrite } from "../cli/cliResultWrite.js"
import { accountInvoicePdfGet } from "./api/accountInvoicePdfGet.js"

export const accountInvoicePdfCommand = buildCommand({
  async func(
    this: CliCommandContext,
    flags: { orderId: number; out: string; apiKey?: string; secretApiKey?: string; baseUrl?: string; mock?: boolean },
  ) {
    const client = cliClientCreate(flags, this.process.env)
    if (!client.success) return cliResultWrite(this.process, client)
    const result = await accountInvoicePdfGet(client.data, { orderId: flags.orderId })
    if (!result.success) return cliResultWrite(this.process, result)
    const { contentBase64, ...metadata } = result.data
    if (!contentBase64)
      return cliResultWrite(
        this.process,
        createResultError("accountInvoicePdfGet", "Response did not contain PDF data"),
      )
    try {
      await writeFile(flags.out, Buffer.from(contentBase64, "base64"))
    } catch (error) {
      return cliResultWrite(
        this.process,
        createResultError("accountInvoicePdfGet", "Could not write PDF file", String(error)),
      )
    }
    cliResultWrite(this.process, createResult({ ...metadata, path: flags.out }))
  },
  parameters: {
    flags: {
      ...cliClientOptions,
      orderId: cliOptionCreate(cliOptionSchemas.integer, "Invoice order ID"),
      out: cliOptionCreate(cliOptionSchemas.nonEmptyString, "Output PDF path"),
    },
  },
  docs: { brief: "Download an invoice PDF to a file" },
})
