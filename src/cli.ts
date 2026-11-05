#!/usr/bin/env node
import { buildApplication, buildRouteMap } from "@stricli/core"
import { cliApplicationText } from "./cli/cliApplicationText.js"
import { cliEndpointCommandCreate } from "./cli/cliEndpointCommandCreate.js"
import { cliRun } from "./cli/cliRun.js"
import { cliVersionCommand } from "./cli/cliVersionCommand.js"
import { packageVersion } from "./packageVersion.js"
import { utilityPingEndpoint } from "./utility/endpoint/utilityPingEndpoint.js"
import { utilityCommand } from "./utility/utilityCommand.js"

const routes = buildRouteMap({
  routes: {
    utility: utilityCommand,
    ping: cliEndpointCommandCreate(utilityPingEndpoint),
    version: cliVersionCommand,
  },
  docs: {
    brief: "Run Porkbun API v3 commands",
    fullDescription:
      "Global flags: --api-key, --secret-api-key, --base-url, --mock, --env-path <path>. Flags may appear before or after the route.",
  },
})

export const porkbunCommand = buildApplication(routes, {
  name: "porkbun",
  scanner: { caseStyle: "allow-kebab-for-camel" },
  documentation: { disableAnsiColor: true },
  localization: { text: cliApplicationText },
  versionInfo: { currentVersion: packageVersion },
})

const inputs = process.argv.slice(2)
const normalized =
  inputs.includes("--version") && inputs.includes("--verbose")
    ? inputs.map((input) => (input === "--version" ? "version" : input))
    : inputs
await cliRun(porkbunCommand, normalized, process)
if (process.exitCode !== undefined && process.exitCode !== null && process.exitCode !== 0) process.exitCode = 1
