import { expect, test } from "bun:test"
import { buildApplication, buildRouteMap, type StricliProcess } from "@stricli/core"
import { cliApplicationText } from "../../cli/cliApplicationText.js"
import { cliRun } from "../../cli/cliRun.js"
import { hostingCommand } from "../hostingCommand.js"
import { hostingFileDeployCommand } from "../hostingFileDeployCommand.js"

test("hosting CLI accepts a raw WordPress SKU and forwards the deploy retry key", async () => {
  const app = buildApplication(
    buildRouteMap({
      routes: { deploy: hostingFileDeployCommand, hosting: hostingCommand },
      docs: { brief: "Hosting" },
    }),
    {
      name: "test",
      scanner: { caseStyle: "allow-kebab-for-camel" },
      documentation: { disableAnsiColor: true },
      localization: { text: cliApplicationText },
    },
  )
  let output = ""
  const process: StricliProcess = {
    env: { PORKBUN_API_KEY: "pk", PORKBUN_SECRET_API_KEY: "sk" },
    stdout: {
      write: (text) => {
        output += text
      },
    },
    stderr: {
      write: (text) => {
        output += text
      },
    },
  }
  await cliRun(app, ["deploy", "--help"], process)
  expect(output).toContain("idempotency-key")
  output = ""
  const original = globalThis.fetch
  const calls: { url: string; key: string | null }[] = []
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), key: new Headers(init?.headers).get("Idempotency-Key") })
    return Response.json({ status: "SUCCESS", deployed: ["index.html"] })
  }) as typeof fetch
  try {
    await cliRun(
      app,
      [
        "deploy",
        "--domain",
        "example.com",
        "--files",
        '[{"path":"index.html","content":"aGk="}]',
        "--yes",
        "--mock",
        "--idempotency-key",
        "retry-123",
      ],
      process,
    )
    expect(JSON.parse(output).success).toBe(true)
    output = ""
    await cliRun(
      app,
      [
        "hosting",
        "create",
        "--domain",
        "example.com",
        "--sku",
        "CLOUDWORDPRESSM1",
        "--acknowledged-cost",
        "1200",
        "--agree-to-terms",
        "yes",
        "--dry-run",
        "--mock",
      ],
      process,
    )
  } finally {
    globalThis.fetch = original
  }
  expect(calls.slice(0, 1)).toEqual([
    { url: "https://api.porkbun.com/api/json/v3/mock/hosting/deploy/example.com", key: "retry-123" },
  ])
  expect(calls).toHaveLength(2)
  expect(calls[1]!.url).toBe("https://api.porkbun.com/api/json/v3/mock/hosting/create/example.com")
  expect(JSON.parse(output).success).toBe(true)
})
