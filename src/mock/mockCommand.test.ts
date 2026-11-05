import { expect, test } from "bun:test"
import { buildApplication, buildRouteMap, type StricliProcess } from "@stricli/core"
import { cliApplicationText } from "../cli/cliApplicationText.js"
import { cliRun } from "../cli/cliRun.js"
import { mockCommand } from "./mockCommand.js"

test("mock CLI help and call use slash-preserving paths", async () => {
  const app = buildApplication(buildRouteMap({ routes: { mock: mockCommand }, docs: { brief: "Mock" } }), {
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
  await cliRun(app, ["mock", "call", "--help"], process)
  expect(stdout).toContain("Call a mock endpoint")
  stdout = ""
  const original = globalThis.fetch
  let url = ""
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    url = String(input)
    return Response.json({ status: "SUCCESS" })
  }) as typeof fetch
  try {
    await cliRun(app, ["mock", "call", "--path", "domain/listAll"], process)
  } finally {
    globalThis.fetch = original
  }
  expect(stderr).toBe("")
  expect(url).toContain("/mock/domain/listAll")
  expect(stdout).toContain('"success":true')
})
