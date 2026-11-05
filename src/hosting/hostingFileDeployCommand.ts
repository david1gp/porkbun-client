import { buildCommand } from "@stricli/core"
import * as a from "valibot"
import { createResultError } from "#result"
import { type CliClientInput, cliClientCreate } from "../cli/cliClientCreate.js"
import { cliClientOptions } from "../cli/cliClientOptions.js"
import type { CliCommandContext } from "../cli/cliCommandContext.js"
import { cliOptionCreate } from "../cli/cliOptionCreate.js"
import { cliResultWrite } from "../cli/cliResultWrite.js"
import { hostingFileCollect } from "./api/hostingFileCollect.js"
import { hostingFileDeployBatched } from "./api/hostingFileDeployBatched.js"
import { hostingFileDeployEndpoint } from "./endpoint/hostingFileDeployEndpoint.js"

type Flags = CliClientInput & {
  domain: string
  dir?: string
  file?: string[]
  files?: { path?: string; content?: string }[]
  idempotencyKey?: string
  includeHidden?: boolean
  yes?: boolean
}
export const hostingFileDeployCommand = buildCommand({
  async func(this: CliCommandContext, flags: Flags) {
    if (!flags.yes) {
      cliResultWrite(this.process, {
        ...createResultError("hostingFileDeploy", "Pass --yes to confirm this destructive operation"),
        code: "CONFIRMATION_REQUIRED",
      })
      return
    }
    const client = cliClientCreate(flags, this.process.env)
    if (!client.success) {
      cliResultWrite(this.process, client)
      return
    }
    const files = await hostingFileCollect(flags)
    if (!files.success) {
      cliResultWrite(this.process, files)
      return
    }
    cliResultWrite(
      this.process,
      await hostingFileDeployBatched(
        client.data,
        { domain: flags.domain, files: files.data },
        { idempotencyKey: flags.idempotencyKey },
      ),
    )
  },
  parameters: {
    flags: {
      ...cliClientOptions,
      domain: cliOptionCreate(a.string(), "Domain"),
      dir: cliOptionCreate(a.string(), "Recursively upload a directory", { optional: true }),
      file: cliOptionCreate(a.string(), "Local file optionally =remote/path", { optional: true, variadic: true }),
      files: cliOptionCreate(
        a.pipe(a.string(), a.parseJson(), hostingFileDeployEndpoint.inputSchema.entries.files),
        "Raw JSON file array",
        { optional: true },
      ),
      idempotencyKey: cliOptionCreate(a.string(), "Stable retry key (later batches append :2, :3, …)", {
        optional: true,
      }),
      includeHidden: { kind: "boolean", optional: true, brief: "Include hidden files and directories" },
      yes: { kind: "boolean", optional: true, brief: "Confirm destructive operation" },
    },
  },
  docs: { brief: "Upload static files in batches" },
})
