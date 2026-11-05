import { expect, test } from "bun:test"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { buildApplication, buildRouteMap, type StricliProcess } from "@stricli/core"
import { cliApplicationText } from "../cli/cliApplicationText.js"
import { cliRun } from "../cli/cliRun.js"
import { accountInvoicePdfCommand } from "./accountInvoicePdfCommand.js"

test("invoice PDF --out writes decoded bytes and omits base64 from output", async () => {
  const dir = await mkdtemp(join(tmpdir(), "invoice-"))
  const path = join(dir, "invoice.pdf")
  const app = buildApplication(buildRouteMap({ routes: { pdf: accountInvoicePdfCommand }, docs: { brief: "Test" } }), {
    name: "test",
    scanner: { caseStyle: "allow-kebab-for-camel" },
    documentation: { disableAnsiColor: true },
    localization: { text: cliApplicationText },
  })
  let stdout = ""
  let stderr = ""
  const process: StricliProcess = {
    env: { PORKBUN_API_KEY: "key", PORKBUN_SECRET_API_KEY: "secret" },
    stdout: {
      write: (s) => {
        stdout += s
      },
    },
    stderr: {
      write: (s) => {
        stderr += s
      },
    },
  }
  const original = globalThis.fetch
  globalThis.fetch = (async () =>
    Response.json({
      status: "SUCCESS",
      contentBase64: Buffer.from("%PDF-test").toString("base64"),
    })) as unknown as typeof fetch
  try {
    await cliRun(app, ["pdf", "--order-id", "12", "--out", path], process)
    expect(stderr).toBe("")
    expect(await readFile(path, "utf8")).toBe("%PDF-test")
    expect(JSON.parse(stdout).data.path).toBe(path)
    expect(stdout).not.toContain("contentBase64")
  } finally {
    globalThis.fetch = original
    await rm(dir, { recursive: true, force: true })
  }
})
