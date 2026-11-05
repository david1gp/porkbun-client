import { expect, test } from "bun:test"
import { buildApplication, buildRouteMap, type StricliProcess } from "@stricli/core"
import { cliApplicationText } from "../cli/cliApplicationText.js"
import { cliRun } from "../cli/cliRun.js"
import { pricingCommand } from "./pricingCommand.js"

test("pricing CLI renders help and sends a public request to the mock", async () => {
  const app = buildApplication(buildRouteMap({ routes: { pricing: pricingCommand }, docs: { brief: "Pricing" } }), {
    name: "porkbun",
    scanner: { caseStyle: "allow-kebab-for-camel" },
    documentation: { disableAnsiColor: true },
    localization: { text: cliApplicationText },
  })
  let stdout = ""
  let stderr = ""
  const process: StricliProcess = {
    env: {},
    stdout: {
      write: (text) => {
        stdout += text
      },
    },
    stderr: {
      write: (text) => {
        stderr += text
      },
    },
  }
  await cliRun(app, ["pricing", "get", "--help"], process)
  expect(stdout).toContain("Retrieve public domain pricing")
  stdout = ""
  let url = ""
  const original = globalThis.fetch
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    url = String(input)
    return Response.json({ status: "SUCCESS", pricing: {} })
  }) as typeof fetch
  try {
    await cliRun(app, ["pricing", "get", "--mock", "--tld", "com"], process)
  } finally {
    globalThis.fetch = original
  }
  expect(stderr).toBe("")
  expect(url).toContain("/mock/pricing/get")
  expect(stdout).toContain('"success":true')
})
