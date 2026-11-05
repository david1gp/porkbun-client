# @adaptive-ds/porkbun-client

A typed, Result-based TypeScript client and JSON CLI for the Porkbun API v3.
This repository currently contains the shared foundation and utility endpoints;
additional bounded contexts build on the same endpoint definitions.

- Node.js >= 22; ESM and TypeScript declarations.
- Valibot validation for inputs and responses, including additive response fields.
- No thrown API errors: inspect `result.success`, then `result.data` or
  `result.code` / `result.errorMessage` / `result.statusCode`.
- One endpoint definition drives both the library and CLI.
- Official OpenAPI v3.73 source is retained in `spec/`.

## Install

```sh
bun add @adaptive-ds/porkbun-client @adaptive-ds/result valibot
```

## Library

```ts
import {
  porkbunClientCreate,
  porkbunMockBaseUrl,
  utilityIp,
  utilityPing,
} from "@adaptive-ds/porkbun-client"

const created = porkbunClientCreate({
  baseUrl: porkbunMockBaseUrl, // omit for production
  apiKey: "pk1_mock",
  secretApiKey: "sk1_mock",
})
if (!created.success) {
  console.error(created.errorMessage)
} else {
  const ping = await utilityPing(created.data)
  const ip = await utilityIp(created.data)
  console.log(ping, ip)
}
```

Credentials are optional when creating a client. Public endpoints such as
`utilityIp` work without them; authenticated calls fail locally with
`API_KEY_REQUIRED` if either key is missing. Even with the mock base URL,
authenticated endpoint definitions require dummy keys locally.

For advanced use, inject `fetch`, choose `porkbunBaseUrlIpv4`, or pass request
options `{ idempotencyKey, headers, signal }`. Non-safe POSTs generate idempotency
keys automatically. **No automatic retries** are performed; reuse an explicit
key when retrying a purchase across calls or processes.

## CLI

```sh
porkbun utility ip
porkbun --mock utility ping --api-key x --secret-api-key y
porkbun utility ping --env-path ./credentials.env
porkbun utility ping --help
porkbun --version
```

Supported global flags: `--api-key`, `--secret-api-key`, `--base-url`, `--mock`,
and `--env-path`. Flags override `PORKBUN_API_KEY`, `PORKBUN_SECRET_API_KEY`, and
`PORKBUN_BASE_URL`. The CLI loads `.env` automatically; inherited environment
variables take precedence over file values. Explicit base URL wins over mock;
mock wins over environment base URL. The library itself does not read env files.

Each invocation writes one JSON Result: success to stdout, failure to stderr
with exit code 1. Help/version output is also wrapped in a JSON Result. Paid or
destructive commands require `--yes`, unless they support and receive `--dry-run`.
POST commands accept `--idempotency-key`.

## Development

```sh
bun install
bun check
bun run lint
bun test src
bun run build
bun run test:e2e
node dist/cli.js --mock utility ping --api-key x --secret-api-key y
```

Unit tests use fake fetches, never the network. E2E tests use the official
credential-free **mock** server, never paid production writes.

See [docs/architecture.md](docs/architecture.md) for the copyable utility
implementation, endpoint/API/CLI conventions, shared schema catalog, testing
instructions, and parallel-agent ownership rules.

MIT © 2026 David Siewert
