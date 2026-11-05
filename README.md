# @adaptive-ds/porkbun-client

A typed TypeScript client and practical CLI for the Porkbun API v3.

[![npm](https://img.shields.io/npm/v/%40adaptive-ds%2Fporkbun-client)](https://www.npmjs.com/package/@adaptive-ds/porkbun-client)
[![license](https://img.shields.io/npm/l/%40adaptive-ds%2Fporkbun-client)](./LICENSE)

## Features

- Porkbun API v3 coverage pinned to the **v3.73** specification: 152 endpoint functions cover 170 method/path operations across 19 contexts: domains, DNS, hosting, billing, and more.
- Valibot-validated inputs and responses; Result-based API instead of throwing for expected failures. Porkbun errors retain their machine-readable `code` and HTTP `statusCode` when supplied.
- Automatic `Idempotency-Key` on unsafe writes, with an explicit key for retries; dry-run support where the endpoint offers it.
- Sandbox workflows and a mock server requiring no real credentials; webhook signature verification and event validation.
- Typed `porkbunEndpointList` catalog and endpoint definitions with operation, scope, and safety metadata.

## Install

Requires Node.js 22+ or Bun. Install the peer dependencies alongside the client:

```sh
bun add @adaptive-ds/porkbun-client @adaptive-ds/result valibot
```

Install the CLI globally:

```sh
bun add -g @adaptive-ds/porkbun-client @adaptive-ds/result valibot
porkbun --help
```

## Library quick start

Enable API access for your domains in Porkbun and provide an API key and secret. Never commit credentials.

```ts
import {
  porkbunClientCreate, utilityPing, dnsRecordCreate, domainList,
} from '@adaptive-ds/porkbun-client'

const created = porkbunClientCreate({
  apiKey: process.env.PORKBUN_API_KEY,
  secretApiKey: process.env.PORKBUN_SECRET_API_KEY,
})
if (!created.success) throw new Error(created.errorMessage)
const client = created.data

const ping = await utilityPing(client)
if (ping.success) console.log(ping.data)

const record = await dnsRecordCreate(client, {
  domain: 'example.com', name: 'www', type: 'A', content: '192.0.2.1',
})
if (!record.success) {
  if (record.code === 'API_KEY_REQUIRED') console.error('Configure both API keys')
  else console.error(record.code, record.statusCode, record.errorMessage)
} else {
  console.log(record.data)
}

const domains = await domainList(client, {})
if (domains.success) console.log(domains.data)
```

The client and endpoint calls return `Result` values. Check `success` before reading `data`; errors have `errorMessage`, and may include `code` and `statusCode`. The example throws only at the application boundary. To retry an operation safely, supply the same explicit key as the final argument: `{ idempotencyKey: 'your-stable-operation-id' }`. Automatically generated keys are new for each call.

### Preview a registration

A registration costs money. Check availability and price, explicitly agree to the terms, and review a dry run before making a real purchase. The `cost` must match the total in USD cents for the minimum duration; obtain and verify it from the check response rather than assuming the example value.

```ts
import { domainCheck, domainCreate } from '@adaptive-ds/porkbun-client'

const checked = await domainCheck(client, { domain: 'example.com' })
if (!checked.success) throw new Error(checked.errorMessage)
console.log(checked.data.response) // Review availability, price and minimum duration.

// Replace with the verified total price in cents and your chosen available domain.
const registration = { domain: 'example.com', cost: 1000, agreeToTerms: 'yes' as const }
const preview = await domainCreate(client, { ...registration, dryRun: true })
if (!preview.success) throw new Error(preview.errorMessage)
console.log(preview.data)

// Only after a human has reviewed the preview and authorized the purchase:
// const purchase = await domainCreate(client, registration, { idempotencyKey: 'registration-unique-id' })
```

## Endpoint catalog

Functions below take a client and, except parameterless operations such as `utilityPing`, an input object. Endpoint-specific schemas, response types, and endpoint definitions live alongside the functions. See the [official API documentation](https://porkbun.com/api/json/v3/documentation) for field semantics and permissions.

| Context | Functions |
| --- | --- |
| account | `accountApiSettingsGet`, `accountAutoTopupGet`, `accountAutoTopupSet`, `accountBalanceGet`, `accountEmailVerificationConfirm`, `accountEmailVerificationSend`, `accountInviteCreate`, `accountInviteStatusGet`, `accountInvoiceGet`, `accountInvoiceList`, `accountInvoicePdfGet`, `accountPhoneVerificationConfirm`, `accountPhoneVerificationSend`, `accountTopup`, `accountTopupCrypto`, `accountTopupCryptoStatusGet`, `accountTopupMpp` |
| apiKey | `apiKeyRequest`, `apiKeyRetrieve`, `apiKeyRevoke` |
| cloudflare | `cloudflareConnect`, `cloudflareConnectionGet`, `cloudflareDisconnect`, `cloudflareInventoryList`, `cloudflareMoveGet`, `cloudflareMovePreview`, `cloudflareMoveRetry`, `cloudflareMoveRollback`, `cloudflareProxySet`, `cloudflareQueueList`, `cloudflareRecordCreate`, `cloudflareRecordDelete`, `cloudflareRecordEdit`, `cloudflareRecordList`, `cloudflareZoneGet`, `cloudflareZoneSettingsGet`, `cloudflareZoneSettingsSet` |
| dns | `dnsHistoryDiff`, `dnsHistoryList`, `dnsHistoryRestore`, `dnsImport`, `dnsPreflight`, `dnsRecordCreate`, `dnsRecordDelete`, `dnsRecordDeleteByNameType`, `dnsRecordEdit`, `dnsRecordEditByNameType`, `dnsRecordGet`, `dnsRecordList`, `dnsRecordListByNameType`, `dnsScan` |
| dnssec | `dnssecRecordCreate`, `dnssecRecordDelete`, `dnssecRecordList` |
| domain | `domainAutoRenewUpdate`, `domainCheck`, `domainCheckBulk`, `domainContactList`, `domainContactUpdate`, `domainCreate`, `domainGet`, `domainList`, `domainNameserverList`, `domainNameserverUpdate`, `domainRegistrationRequirementsGet`, `domainRenew` |
| email | `emailForwardCreate`, `emailForwardDelete`, `emailForwardList`, `emailMailboxCreate`, `emailMailboxList`, `emailMailboxRenew`, `emailMailboxSetup`, `emailPasswordSet` |
| glue | `glueCreate`, `glueDelete`, `glueList`, `glueUpdate` |
| hosting | `hostingAutoRenewUpdate`, `hostingBackupCreate`, `hostingBackupDelete`, `hostingBackupList`, `hostingBackupRestore`, `hostingCreate`, `hostingDelete`, `hostingDirCreate`, `hostingFileDelete`, `hostingFileDeploy`, `hostingFileList`, `hostingGet`, `hostingPhpVersionSet`, `hostingPlanList`, `hostingSearchVisibilitySet`, `hostingSslReissue`, `hostingStagingCreate`, `hostingStagingDelete`, `hostingStagingEnvironmentSet`, `hostingStagingGateSet`, `hostingStagingGet`, `hostingStagingGuardSet`, `hostingStagingPublish`, `hostingStagingReset`, `hostingWordPressVersionSet`, `hostingWpCredentialCreate`, `hostingWpCredentialDelete`, `hostingWpCredentialList` |
| linkInBio | `linkInBioAppearanceUpdate`, `linkInBioCreate`, `linkInBioGet`, `linkInBioLinkCreate`, `linkInBioLinkDelete`, `linkInBioLinkEdit`, `linkInBioLinkReorder`, `linkInBioProfileUpdate`, `linkInBioSettingsUpdate`, `linkInBioSocialsUpdate` |
| market | `aftermarketSearch`, `closeoutBuy`, `closeoutGet`, `closeoutSearch`, `marketplaceList` |
| mock | `mockEndpointCall`, `mockEndpointList` |
| pricing | `pricingGet` |
| sandbox | `sandboxReset`, `sandboxTopup`, `sandboxWebhookTrigger` |
| ssl | `sslBundleGet` |
| transfer | `transferAuthCodeUpdate`, `transferCancel`, `transferCreate`, `transferGet`, `transferList`, `transferPrepare`, `transferSetupGet`, `transferStart` |
| urlForward | `urlForwardCreate`, `urlForwardDelete`, `urlForwardList` |
| utility | `utilityIp`, `utilityPing` |
| webhook | `webhookCreate`, `webhookDelete`, `webhookDeliveryGet`, `webhookDeliveryList`, `webhookDeliveryResend`, `webhookEventTypeList`, `webhookGet`, `webhookList`, `webhookSecretRotate`, `webhookTest`, `webhookUpdate` |

`hostingFileCollect` and `hostingFileDeployBatched` are also available for local file collection and batched uploads. Webhook receiver helpers are described below.

## CLI

Run `porkbun --help` or `porkbun <route> --help` for routes and flags. Route and flag names use kebab case. Top-level routes include `utility`, `ping`, `domain`, `transfer`, `glue`, `url-forward`, `dns`, `dnssec`, `ssl`, `email`, `hosting`, `link-in-bio`, `cloudflare`, `account`, `api-key`, `sandbox`, `pricing`, `market`, `webhook`, `mock`, and `version`.

Command tree (braces group nested routes; `ping` is an alias for `utility ping`):

```text
utility: ip, ping
domain: check, check-bulk, create, renew, list, get, auto-renew-update, registration-requirements-get, nameserver {list, update}, contact {list, update}
transfer: create, setup-get, prepare, start, cancel, auth-code-update, get, list
glue: list, create, update, delete
url-forward: list, create, delete
dns: preflight, scan, import, record {list, get, list-by-name-type, create, edit, edit-by-name-type, delete, delete-by-name-type}, history {list, diff, restore}
dnssec: record {list, create, delete}
ssl: bundle {get}
email: password-set, forward {list, create, delete}, mailbox {list, setup, create, renew}
hosting: plan-list, create, get, delete, auto-renew-update, php-version-set, wordpress-version-set, ssl-reissue, search-visibility-set, file {deploy, list, delete, dir-create}, wp-credential {create, list, delete}, backup {list, create, delete, restore}, staging {get, create, reset, publish, delete, gate-set, guard-set, environment-set}
link-in-bio: get, create, profile-update, socials-update, appearance-update, settings-update, link {create, edit, delete, reorder}
cloudflare: connect, disconnect, connection {get}, inventory {list}, queue {list}, move {get, retry, rollback, preview}, proxy {set}, record {list, create, edit, delete}, zone {get, settings-get, settings-set}
account: balance-get, api-settings-get, auto-topup-get, auto-topup-set, topup, topup-crypto, topup-crypto-status-get, topup-mpp, invite {create, status-get}, invoice {list, get, pdf}, phone-verification {send, confirm}, email-verification {send, confirm}
api-key: request, retrieve, revoke
sandbox: topup, reset, webhook {trigger}
pricing: get
market: marketplace {list}, aftermarket {search}, closeout {search, get, buy}
webhook: list, get, create, update, secret-rotate, test, delete, event-type {list}, delivery {list, get, resend}
mock: call, list
version
```

Authentication and base URL precedence is **flags > environment > `.env`**: `--api-key`, `--secret-api-key`, and `--base-url` override `PORKBUN_API_KEY`, `PORKBUN_SECRET_API_KEY`, and `PORKBUN_BASE_URL`. The default `.env` is in the current directory; use `--env-path` to select another file. `--mock` selects the mock base URL instead of the environment base URL; an explicit `--base-url` still wins.

API command results are JSON: success goes to stdout with exit code 0; failure goes to stderr with exit code 1. Both use the library Result shape (`success`, `data` on success; `errorMessage` and optionally `code`/`statusCode` on failure). Help output is intended for people; the `version` command also returns a JSON Result.

```sh
export PORKBUN_API_KEY='your-api-key'
export PORKBUN_SECRET_API_KEY='your-secret-key'
porkbun ping
porkbun domain list

# Update existing A records for home.example.com (requires jq).
porkbun dns record edit-by-name-type --domain example.com --type A --subdomain home --content "$(porkbun utility ip | jq -r '.data.yourIp')"

# Save certificatechain.pem, privatekey.pem (mode 0600), and publickey.pem.
porkbun ssl bundle get --domain example.com --out-dir ./certs

# Upload a built static site; this operation requires confirmation.
porkbun hosting file deploy --domain example.com --dir ./dist --yes

# Download an invoice PDF.
porkbun account invoice pdf --order-id 123 --out ./invoice.pdf

# Exercise the remote mock API with dummy credentials (no real keys needed).
porkbun --mock --api-key x --secret-api-key y utility ping
porkbun --mock mock list
```

Paid or destructive endpoint commands require `--yes`, unless the endpoint supports `--dry-run` and it is set. A dry run is an API preflight, not a local simulation. Other writes can also support `--dry-run`. Use `--idempotency-key` on POST commands to supply a stable key for retries. Check the particular command's help for supported flags; not every operation supports every option.

## Webhook receiver

Pass the untouched request to `webhookRequestParse`: it reads the raw body, verifies the signature and timestamp, then parses and validates the event. Do not parse the body first. Store the webhook secret securely.

```ts
import { webhookRequestParse } from '@adaptive-ds/porkbun-client'

Bun.serve({
  port: 3000,
  async fetch(request) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    const event = await webhookRequestParse(request, process.env.PORKBUN_WEBHOOK_SECRET!)
    if (!event.success) return new Response('Invalid webhook', { status: 401 })
    console.log(event.data.event)
    // Dispatch event.data and make your handler safe against duplicate deliveries.
    return new Response('OK')
  },
})
```

For custom receivers, `webhookSignatureVerify` accepts `secret`, `timestamp`, `signature`, and `rawBody`; the default timestamp tolerance is 300 seconds. `webhookEventSchema` is available for separate Valibot validation.

## API key authorization with PKCE

Generate a verifier/challenge pair, send the challenge, direct the account holder to the returned approval URL, then retrieve the approved key using the original verifier. Keep the verifier and returned secret private. Request only the scopes you need.

```ts
import { porkbunClientCreate, apiKeyRequest, apiKeyRetrieve } from '@adaptive-ds/porkbun-client'
import { apiKeyPkcePairCreate } from '@adaptive-ds/porkbun-client/apiKey/model/apiKeyPkcePairCreate'

const created = porkbunClientCreate()
if (!created.success) throw new Error(created.errorMessage)
const client = created.data
const { codeVerifier, codeChallenge } = await apiKeyPkcePairCreate()
const request = await apiKeyRequest(client, {
  name: 'My DNS updater', codeChallenge, codeChallengeMethod: 'S256', scopes: ['dns'],
})
if (!request.success) throw new Error(request.errorMessage)
console.log('Approve:', request.data.authUrl)
// After approval, poll as appropriate; PENDING is not an approved key.
const key = await apiKeyRetrieve(client, { requestToken: request.data.requestToken, codeVerifier })
if (!key.success) throw new Error(key.errorMessage)
if (key.data.status === 'SUCCESS') {
  // Store key.data.apikey and key.data.secretapikey securely.
}
```

## Sandbox and mock testing

The remote mock at `porkbunMockBaseUrl` needs no real credentials (authenticated endpoints still require dummy keys locally) and useful for exercising response shapes without real purchases. Use `--mock` in the CLI or pass `baseUrl: porkbunMockBaseUrl` to `porkbunClientCreate`. Mock responses are not a substitute for testing account-specific behavior.

For stateful sandbox testing, `apiKeyRequest` supports `{ sandbox: true }` to request a throwaway sandbox key pair. Use those credentials against the regular API base URL. The `sandboxTopup`, `sandboxReset`, and `sandboxWebhookTrigger` functions provide sandbox controls; do not use production credentials for test purchases.

## Development

```sh
bun install
bun check
bun run lint
bun test src
bun run test:e2e  # builds and tests against the live remote mock
```

Use `bun run release` to prepare a release. Publishing is performed by GitHub Actions using OIDC trusted publishing when a release tag is pushed.

## Related

- [Porkbun API v3 documentation](https://porkbun.com/api/json/v3/documentation)
- [Official Porkbun MCP server](https://github.com/oborseth/Porkbun-MCP)

## License

MIT © [David Siewert](https://david-siewert.com/)
