import { expect, test } from "bun:test"
import { buildApplication, buildRouteMap, type Command, type StricliProcess } from "@stricli/core"
import * as a from "valibot"
import { createResult } from "#result"
import { porkbunEndpointDefine } from "../shared/porkbunEndpointDefine.js"
import { cliApplicationText } from "./cliApplicationText.js"
import type { CliCommandContext } from "./cliCommandContext.js"
import { cliEndpointCommandCreate } from "./cliEndpointCommandCreate.js"
import { cliRun } from "./cliRun.js"

const endpoint = porkbunEndpointDefine({
  op: "testCli",
  method: "POST",
  path: "/test/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: true, destructive: false, reversible: false, requiresConfirmation: true },
  brief: "Test generic flags",
  inputSchema: a.object({
    domain: a.pipe(a.string(), a.description("Domain to operate on")),
    count: a.optional(a.pipe(a.number(), a.integer(), a.minValue(1))),
    enabled: a.optional(a.boolean()),
    mode: a.optional(a.picklist(["one", "two"])),
    labels: a.optional(a.array(a.string())),
    types: a.optional(a.array(a.picklist(["A", "AAAA"]))),
    metadata: a.optional(a.looseObject({ label: a.string() })),
    records: a.optional(a.array(a.object({ name: a.string() }))),
    dryRun: a.optional(a.boolean()),
  }),
  responseSchema: a.looseObject({ status: a.literal("SUCCESS") }),
})

async function execute(command: Command<CliCommandContext>, inputs: string[], env: Record<string, string> = {}) {
  const app = buildApplication(buildRouteMap({ routes: { test: command }, docs: { brief: "Test" } }), {
    name: "test",
    scanner: { caseStyle: "allow-kebab-for-camel" },
    documentation: { disableAnsiColor: true },
    localization: { text: cliApplicationText },
  })
  let stdout = ""
  let stderr = ""
  const process: StricliProcess = {
    env,
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
  const requests: { url: string; body: Record<string, unknown>; headers: Headers }[] = []
  const original = globalThis.fetch
  globalThis.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
    requests.push({ url: String(url), body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) })
    return Response.json({ status: "SUCCESS" })
  }) as typeof fetch
  try {
    await cliRun(app, inputs, process)
  } finally {
    globalThis.fetch = original
  }
  return { stdout, stderr, exitCode: process.exitCode, requests }
}

const credentials = { PORKBUN_API_KEY: "env-pk", PORKBUN_SECRET_API_KEY: "env-sk" }

test("generic CLI parses numbers, booleans, enums, repeatable arrays, and JSON objects/arrays", async () => {
  const result = await execute(
    cliEndpointCommandCreate(endpoint),
    [
      "test",
      "--domain",
      "example.com",
      "--count",
      "2",
      "--enabled",
      "--mode",
      "two",
      "--labels",
      "first",
      "--labels",
      "second",
      "--types",
      "A",
      "--types",
      "AAAA",
      "--metadata",
      '{"label":"meta"}',
      "--records",
      '[{"name":"www"}]',
      "--yes",
      "--idempotency-key",
      "retry",
    ],
    credentials,
  )
  expect(result.stderr).toBe("")
  expect(JSON.parse(result.stdout)).toEqual({ success: true, data: { status: "SUCCESS" } })
  expect(result.requests[0]!.body).toEqual({
    count: 2,
    enabled: true,
    mode: "two",
    labels: ["first", "second"],
    types: ["A", "AAAA"],
    metadata: { label: "meta" },
    records: [{ name: "www" }],
    apikey: "env-pk",
    secretapikey: "env-sk",
  })
  expect(result.requests[0]!.headers.get("idempotency-key")).toBe("retry")
})

test("cost/destructive CLI calls require confirmation and do not fetch without it", async () => {
  const result = await execute(cliEndpointCommandCreate(endpoint), ["test", "--domain", "example.com"], credentials)
  expect(result.stdout).toBe("")
  expect(result.exitCode).toBe(1)
  expect(JSON.parse(result.stderr)).toMatchObject({ success: false, code: "CONFIRMATION_REQUIRED", op: "testCli" })
  expect(result.requests).toHaveLength(0)
})

test("supported dry-run bypasses confirmation; leading global flags and explicit credentials override env", async () => {
  const result = await execute(
    cliEndpointCommandCreate(endpoint),
    ["--mock", "--api-key", "flag-pk", "test", "--domain", "example.com", "--dry-run", "--secret-api-key", "flag-sk"],
    { ...credentials, PORKBUN_BASE_URL: "https://env.example.com" },
  )
  expect(result.stderr).toBe("")
  expect(result.requests[0]!.url).toBe("https://api.porkbun.com/api/json/v3/mock/test/example.com")
  expect(result.requests[0]!.body).toEqual({ dryRun: true, apikey: "flag-pk", secretapikey: "flag-sk" })
})

test("explicit base URL wins over mock and environment", async () => {
  const result = await execute(
    cliEndpointCommandCreate(endpoint),
    ["--base-url=https://flags.example.com/api", "--mock", "test", "--domain", "example.com", "--yes"],
    { ...credentials, PORKBUN_BASE_URL: "https://env.example.com" },
  )
  expect(result.requests[0]!.url).toBe("https://flags.example.com/api/test/example.com")
})

test("whole-object CLI validation rejects a bad repeated enum without fetching", async () => {
  const result = await execute(
    cliEndpointCommandCreate(endpoint),
    ["test", "--domain", "example.com", "--types", "BAD", "--yes"],
    credentials,
  )
  expect(result.stdout).toBe("")
  expect(JSON.parse(result.stderr)).toMatchObject({ success: false, op: "testCli" })
  expect(result.requests).toHaveLength(0)
})

for (const invalid of [
  ["--count", "1.5"],
  ["--metadata", "not json"],
  ["--mode", "three"],
]) {
  test(`invalid CLI ${invalid[0]} produces one JSON error and exit 1`, async () => {
    const result = await execute(
      cliEndpointCommandCreate(endpoint),
      ["test", "--domain", "example.com", "--yes", ...invalid],
      credentials,
    )
    expect(result.stdout).toBe("")
    expect(JSON.parse(result.stderr)).toMatchObject({ success: false })
    expect(result.exitCode).toBe(1)
    expect(result.requests).toHaveLength(0)
  })
}

test("generic command supports extra flags, suppressed flags and a Result-based custom input mapper", async () => {
  const command = cliEndpointCommandCreate(endpoint, {
    omitFlags: ["domain"],
    extraFlags: { localName: { kind: "parsed", brief: "Local domain name", parse: (text: string) => text } },
    inputMap: (flags) => createResult({ domain: String(flags.localName), dryRun: true }),
  })
  const result = await execute(command, ["test", "--local-name", "mapped.example.com"], credentials)
  expect(result.stderr).toBe("")
  expect(result.requests[0]!.url).toEndWith("/test/mapped.example.com")
})

test("schema descriptions become CLI help and help remains one JSON Result", async () => {
  const result = await execute(cliEndpointCommandCreate(endpoint), ["test", "--help"])
  expect(result.stderr).toBe("")
  expect(JSON.parse(result.stdout)).toMatchObject({ success: true })
  expect(result.stdout).toContain("Domain to operate on")
  expect(result.requests).toHaveLength(0)
})
