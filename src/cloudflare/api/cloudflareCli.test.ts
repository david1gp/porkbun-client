import { expect, test } from "bun:test"
import { buildApplication, buildRouteMap, type StricliProcess } from "@stricli/core"
import { cliApplicationText } from "../../cli/cliApplicationText.js"
import { cliEndpointCommandCreate } from "../../cli/cliEndpointCommandCreate.js"
import { cliRun } from "../../cli/cliRun.js"
import { linkInBioGetEndpoint } from "../../linkInBio/endpoint/linkInBioGetEndpoint.js"
import { cloudflareConnectionGetEndpoint } from "../endpoint/cloudflareConnectionGetEndpoint.js"

test("context commands render help and dispatch with mock credentials", async () => {
  const app = buildApplication(
    buildRouteMap({
      routes: {
        cloudflare: cliEndpointCommandCreate(cloudflareConnectionGetEndpoint),
        bio: cliEndpointCommandCreate(linkInBioGetEndpoint),
      },
      docs: { brief: "Contexts" },
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
  await cliRun(app, ["cloudflare", "--help"], process)
  expect(output).toContain("Cloudflare")
  output = ""
  await cliRun(app, ["bio", "--help"], process)
  expect(output).toContain("domain")
  output = ""
  const original = globalThis.fetch
  let url = ""
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    url = String(input)
    return Response.json({ status: "SUCCESS" })
  }) as typeof fetch
  try {
    await cliRun(app, ["cloudflare", "--mock"], process)
  } finally {
    globalThis.fetch = original
  }
  expect(url).toContain("/mock/cloudflare/getConnection")
  expect(output).toContain("SUCCESS")
})
