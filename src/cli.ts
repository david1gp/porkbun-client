#!/usr/bin/env node
import { buildApplication, buildRouteMap } from "@stricli/core"
import { accountCommand } from "./account/accountCommand.js"
import { apiKeyCommand } from "./apiKey/apiKeyCommand.js"
import { cliApplicationText } from "./cli/cliApplicationText.js"
import { cliEndpointCommandCreate } from "./cli/cliEndpointCommandCreate.js"
import { cliRun } from "./cli/cliRun.js"
import { cliVersionCommand } from "./cli/cliVersionCommand.js"
import { cloudflareCommand } from "./cloudflare/cloudflareCommand.js"
import { dnsCommand } from "./dns/dnsCommand.js"
import { dnssecCommand } from "./dnssec/dnssecCommand.js"
import { domainCommand } from "./domain/domainCommand.js"
import { emailCommand } from "./email/emailCommand.js"
import { glueCommand } from "./glue/glueCommand.js"
import { hostingCommand } from "./hosting/hostingCommand.js"
import { linkInBioCommand } from "./linkInBio/linkInBioCommand.js"
import { marketCommand } from "./market/marketCommand.js"
import { mockCommand } from "./mock/mockCommand.js"
import { packageVersion } from "./packageVersion.js"
import { pricingCommand } from "./pricing/pricingCommand.js"
import { sandboxCommand } from "./sandbox/sandboxCommand.js"
import { sslCommand } from "./ssl/sslCommand.js"
import { transferCommand } from "./transfer/transferCommand.js"
import { urlForwardCommand } from "./urlForward/urlForwardCommand.js"
import { utilityPingEndpoint } from "./utility/endpoint/utilityPingEndpoint.js"
import { utilityCommand } from "./utility/utilityCommand.js"
import { webhookCommand } from "./webhook/webhookCommand.js"

const routes = buildRouteMap({
  routes: {
    utility: utilityCommand,
    ping: cliEndpointCommandCreate(utilityPingEndpoint),
    domain: domainCommand,
    transfer: transferCommand,
    glue: glueCommand,
    "url-forward": urlForwardCommand,
    dns: dnsCommand,
    dnssec: dnssecCommand,
    ssl: sslCommand,
    email: emailCommand,
    hosting: hostingCommand,
    "link-in-bio": linkInBioCommand,
    cloudflare: cloudflareCommand,
    account: accountCommand,
    "api-key": apiKeyCommand,
    sandbox: sandboxCommand,
    pricing: pricingCommand,
    market: marketCommand,
    webhook: webhookCommand,
    mock: mockCommand,
    version: cliVersionCommand,
  },
  docs: {
    brief: "Manage domains, DNS, hosting, email, account and the complete Porkbun API v3",
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
