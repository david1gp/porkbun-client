import { expect, test } from "bun:test"
import { chmod, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { buildApplication, type StricliProcess } from "@stricli/core"
import { cliApplicationText } from "../cli/cliApplicationText.js"
import { cliRun } from "../cli/cliRun.js"
import { sslCommand } from "./sslCommand.js"

const app = buildApplication(sslCommand, {
  name: "ssl-test",
  scanner: { caseStyle: "allow-kebab-for-camel" },
  documentation: { disableAnsiColor: true },
  localization: { text: cliApplicationText },
})

function processCreate() {
  let stdout = ""
  let stderr = ""
  const process: StricliProcess = {
    env: {},
    stdout: {
      write: (value) => {
        stdout += value
      },
    },
    stderr: {
      write: (value) => {
        stderr += value
      },
    },
  }
  return { process, stdout: () => stdout, stderr: () => stderr }
}

test("SSL --out-dir writes the three PEM contents and secures an existing private key to 0600", async () => {
  const directory = await mkdtemp(join(tmpdir(), "porkbun-ssl-"))
  const originalFetch = globalThis.fetch
  const bundle = { status: "SUCCESS", certificatechain: "CHAIN\n", privatekey: "PRIVATE\n", publickey: "PUBLIC\n" }
  const requests: string[] = []
  globalThis.fetch = (async (url, init) => {
    requests.push(String(url))
    expect(init?.method).toBe("POST")
    expect(JSON.parse(String(init?.body))).toEqual({ apikey: "pk1_mock", secretapikey: "sk1_mock" })
    return Response.json(bundle)
  }) as typeof fetch
  try {
    const paths = {
      certificatechain: join(directory, "certificatechain.pem"),
      privatekey: join(directory, "privatekey.pem"),
      publickey: join(directory, "publickey.pem"),
    }
    await writeFile(paths.privatekey, "old private key")
    await chmod(paths.privatekey, 0o644)
    const output = processCreate()
    await cliRun(
      app,
      [
        "bundle-get",
        "--domain",
        "example.com",
        "--out-dir",
        directory,
        "--mock",
        "--api-key",
        "pk1_mock",
        "--secret-api-key",
        "sk1_mock",
      ],
      output.process,
    )
    expect(output.stderr()).toBe("")
    expect(JSON.parse(output.stdout())).toEqual({ success: true, data: paths })
    expect(requests).toEqual(["https://api.porkbun.com/api/json/v3/mock/ssl/retrieve/example.com"])
    for (const key of ["certificatechain", "privatekey", "publickey"] as const)
      expect(await readFile(paths[key], "utf8")).toBe(bundle[key])
    expect((await stat(paths.privatekey)).mode & 0o777).toBe(0o600)
  } finally {
    globalThis.fetch = originalFetch
    await rm(directory, { recursive: true, force: true })
  }
})

test("SSL CLI help exposes --out-dir without making a request", async () => {
  const output = processCreate()
  await cliRun(app, ["bundle-get", "--help"], output.process)
  expect(output.stderr()).toBe("")
  expect(JSON.parse(output.stdout())).toMatchObject({ success: true })
  expect(output.stdout()).toContain("--out-dir")
})
