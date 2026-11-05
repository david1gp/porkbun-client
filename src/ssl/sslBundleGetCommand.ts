import { chmod, mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { buildCommand } from "@stricli/core"
import { createResult, createResultError } from "#result"
import { cliClientCreate } from "../cli/cliClientCreate.js"
import { cliClientOptions } from "../cli/cliClientOptions.js"
import type { CliCommandContext } from "../cli/cliCommandContext.js"
import { cliOptionCreate } from "../cli/cliOptionCreate.js"
import { cliOptionSchemas } from "../cli/cliOptionSchemas.js"
import { cliResultWrite } from "../cli/cliResultWrite.js"
import { sslBundleGet } from "./api/sslBundleGet.js"

export const sslBundleGetCommand = buildCommand({
  async func(
    this: CliCommandContext,
    flags: {
      domain: string
      outDir?: string
      apiKey?: string
      secretApiKey?: string
      baseUrl?: string
      mock?: boolean
      envPath?: string
      idempotencyKey?: string
    },
  ) {
    const client = cliClientCreate(flags, this.process.env)
    if (!client.success) return cliResultWrite(this.process, client)
    const result = await sslBundleGet(client.data, { domain: flags.domain }, { idempotencyKey: flags.idempotencyKey })
    if (!result.success || !flags.outDir) return cliResultWrite(this.process, result)
    const { certificatechain, privatekey, publickey } = result.data
    if (certificatechain === undefined || privatekey === undefined || publickey === undefined)
      return cliResultWrite(this.process, createResultError("sslBundleGet", "Certificate bundle is incomplete"))
    const paths = {
      certificatechain: join(flags.outDir, "certificatechain.pem"),
      privatekey: join(flags.outDir, "privatekey.pem"),
      publickey: join(flags.outDir, "publickey.pem"),
    }
    try {
      await mkdir(flags.outDir, { recursive: true })
      await writeFile(paths.certificatechain, certificatechain)
      await writeFile(paths.privatekey, privatekey, { mode: 0o600 })
      await chmod(paths.privatekey, 0o600)
      await writeFile(paths.publickey, publickey)
    } catch (error) {
      return cliResultWrite(
        this.process,
        createResultError(
          "sslBundleGet",
          "Could not write certificate bundle",
          error instanceof Error ? error.message : String(error),
        ),
      )
    }
    return cliResultWrite(this.process, createResult(paths))
  },
  parameters: {
    flags: {
      ...cliClientOptions,
      domain: cliOptionCreate(cliOptionSchemas.nonEmptyString, "Domain name"),
      outDir: cliOptionCreate(cliOptionSchemas.nonEmptyString, "Write PEM files to this directory", { optional: true }),
      idempotencyKey: cliOptionCreate(cliOptionSchemas.nonEmptyString, "Stable key to reuse on retries", {
        optional: true,
      }),
    },
  },
  docs: { brief: "Retrieve SSL certificate bundle" },
})
