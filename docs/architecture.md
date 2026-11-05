# Architecture and endpoint implementation guide

The source of truth is `spec/porkbun-openapi.json` (v3.73). Use
`spec/operations-summary.txt` to navigate, then check the full operation and its
referenced schemas. `spec/api-description.md` covers auth, errors, rate limits,
idempotency, sandbox, and mock behavior. The foundation implements utility only;
other contexts should copy it, not invent a second request or CLI framework.

## Layout and ownership

```text
src/
  index.ts                          public exports; orchestrator maintains
  cli.ts                            executable + application; orchestrator wires routes
  packageVersion.ts                 reads package.json; no second version constant
  shared/
    PorkbunClient.ts, PorkbunFetch.ts
    PorkbunEndpoint*.ts, PorkbunRequestOptions.ts
    porkbunClientCreate.ts, porkbunEndpointDefine.ts, porkbunEndpointCall.ts
    porkbunEndpointRequestCreate.ts, porkbunErrorResultCreate.ts
    porkbunBaseUrl.ts, porkbunBaseUrlIpv4.ts, porkbunMockBaseUrl.ts
    schema/                         reusable cross-context schemas
  cli/                              generic command builder and process infrastructure
  utility/
    endpoint/utilityPingEndpoint.ts single endpoint definition + derived types
    api/utilityPing.ts              thin public function
    api/utilityPing.test.ts         fake-fetch unit tests; NO network
    utilityCommand.ts               context route map (one export)
e2e/utility.e2e.ts                   credential-free live MOCK tests
```

One export per file, named after the export. A schema/endpoint and its derived
input/output types may share a file. Root `src/index.ts` is the public barrel;
do not create context index barrels. Use `.js` extensions on relative imports.
Import Valibot as `import * as a from "valibot"`. All fallible application/library
functions return `Result` / `PromiseResult` from `#result`; never throw. Use early
returns. Throwing IO is caught at its boundary. The sole framework exception is
Stricli's synchronous flag parser: its required thrown parse errors are converted
to JSON Result errors by the application localization and runner.

**Names are subject-first:** context + subject + verb, e.g.
`domainNameserverUpdate`, `dnsRecordListByNameType`, `utilityPing`.
Keep the public function, endpoint `op`, and file stem consistent. The endpoint
constant appends `Endpoint`; PascalCase derived types append `Input`/`Response`.
Use existing API field spelling in schemas (including `dryRun`), not CLI kebab
spelling. Copy `x-porkbun-scope` and all five `x-porkbun-agent` fields exactly.
Do not casually edit `src/shared` or `src/cli`: report required infrastructure
changes to the orchestrator so parallel context implementations do not conflict.

## Generic API contracts

```ts
porkbunClientCreate(input?: PorkbunClientCreateInput): Result<PorkbunClient>
// input: { apiKey?, secretApiKey?, baseUrl?, fetch?: PorkbunFetch, userAgent? }

porkbunEndpointDefine<TInput, TResponse, TPath>(
  definition: PorkbunEndpoint<TInput, TResponse, TPath> /* path keys checked */,
): PorkbunEndpoint<TInput, TResponse, TPath>

porkbunEndpointCall<E extends PorkbunEndpoint>(
  client: PorkbunClient,
  endpoint: E,
  input: PorkbunEndpointInput<E>,
  options?: PorkbunRequestOptions,
): PromiseResult<PorkbunEndpointOutput<E>>

// Both alias the endpoint schemas, never handwritten duplicate DTOs:
PorkbunEndpointInput<E>  // a.InferInput<E['inputSchema']>
PorkbunEndpointOutput<E> // a.InferOutput<E['responseSchema']>

// options: { idempotencyKey?: string; headers?: Record<string,string>; signal?: AbortSignal }
cliEndpointCommandCreate<E extends PorkbunEndpoint>(
  endpoint: E,
  options?: CliEndpointCommandOptions<E>,
): Command<CliCommandContext>
```

`TInput` is a synchronous object schema with introspectable `entries` and
record-shaped input/output. `TResponse` is any synchronous Valibot schema,
including unions. `TPath` is inferred as a literal. Every `{placeholder}` must
be an input entry at compile time; make path entries required. Do not manually
annotate an endpoint as the broad `PorkbunEndpoint` type (that erases inference).

## Implement an endpoint

1. Copy `src/utility/endpoint/utilityPingEndpoint.ts`. Give the operation its
   context-first name, method, literal path, auth, metadata and help `brief`.
   Declare path + body/query fields in ONE `a.object` input; **never add
   `apikey` or `secretapikey`**. Public endpoints use `auth: "none"`.
2. Define responses using **`a.looseObject`**, including nested objects: additive
   API fields must not break parsing. Match spec `required` precisely; do not
   infer required fields from examples. Preserve numbers-as-strings (`ttl` is a
   string), enum values and casing, and `nullable` via `a.nullable`/`a.nullish`.
   Use `a.union([realResponse, porkbunDryRunPreviewSchema])` for real/dry-run
   results. No `a.any()`; use `a.unknown()` only for genuinely arbitrary JSON
   such as JSON-Schema documents, not unfinished response modeling.
3. Add descriptions to inputs, including reused schemas, e.g.
   `a.optional(a.pipe(a.string(), a.description("Record content")))`.
   The generic CLI unwraps optional/nullable schemas and uses descriptions as
   flag help. Keep transformations to idempotent normalization (trim/lowercase),
   not stateful transformations: schemas can be validated more than once.
4. Export `FooInput = PorkbunEndpointInput<typeof fooEndpoint>` and
   `FooResponse = PorkbunEndpointOutput<typeof fooEndpoint>` from that endpoint
   file. Add context-local reusable schemas in `src/<ctx>/schema/`, one per file.
5. Copy the thin utility API function:

   ```ts
   export function dnsRecordCreate(
     client: PorkbunClient,
     input: DnsRecordCreateInput,
     options?: PorkbunRequestOptions,
   ): PromiseResult<DnsRecordCreateResponse> {
     return porkbunEndpointCall(client, dnsRecordCreateEndpoint, input, options)
   }
   ```

   A no-input endpoint takes `(client, options?)` and passes `{}` internally.
   Do not duplicate request building, validation, credentials or error mapping.

### GET/POST duplicates

Implement **one function per path**. Prefer POST when both GET and POST exist:
the JSON body is the primary documented contract. Use GET for GET-only paths.
Explicit foundation exceptions requested by the project: `utilityIp` uses GET
`/ip` despite its POST mirror; `utilityPing` uses POST `/ping` with **required
credentials** (the upstream API itself also allows credential-free ping).

### Transport and failure semantics

- Path values are URL-encoded and removed from the payload.
- POST sends JSON (at least `{}`); required auth injects `apikey` and
  `secretapikey`. GET uses `X-API-Key` and `X-Secret-API-Key`; public endpoints
  do not automatically send credentials. Remaining fields are query parameters.
- GET defaults to OpenAPI `form`, `explode:true`: arrays repeat, booleans are
  `true`/`false`. The two explicit spec styles (`tlds` on domain list and
  marketplace list) use this default. Other contracts can specify endpoint
  `query: { field: { style: "form", explode: false } }`; space/pipe-delimited
  arrays and deepObject objects are also supported.
- Non-safe POSTs get an automatic UUID `Idempotency-Key`; safe POSTs do not.
  An explicit `options.idempotencyKey` works on all POSTs. There are **no automatic
  retries**. For retrying paid writes across calls/processes, persist and reuse
  an explicit key; separate calls otherwise generate separate UUIDs.
- Auth is enforced locally even on mock URLs; give authenticated mock calls
  dummy keys (`pk1_mock` / `sk1_mock`). No real credentials are needed.
- HTTP failures AND HTTP-200 `status:"ERROR"` return ResultErr with endpoint
  `op`, upstream `code`, `statusCode`, raw response `errorData`, and message plus
  ` — next: <hint>` when available. Network/JSON/schema failures also return
  ResultErr. Do not branch by parsing human error messages.
- `porkbunEndpointRequestCreate` is a lower-level serialization helper for
  already-validated input; normal endpoint functions should not call it directly.

## CLI routing and extension

Each context exports exactly one route map from `src/<ctx>/<ctx>Command.ts`:

```ts
export const dnsCommand = buildRouteMap({
  routes: {
    create: cliEndpointCommandCreate(dnsRecordCreateEndpoint),
    editByNameType: cliEndpointCommandCreate(dnsRecordEditByNameTypeEndpoint),
  },
  docs: { brief: "Manage DNS records" },
})
```

The scanner accepts kebab for camel, so `editByNameType` is invoked as
`edit-by-name-type`; the orchestrator mounts e.g. `urlForward` as `url-forward`.
The orchestrator adds the context route to `src/cli.ts` and public endpoint,
API, and schema exports to `src/index.ts`. Context agents should report that
wiring list instead of racing to edit those files.

The generic builder handles strings, numbers/integers, booleans, enum/picklist
flags, repeated string/picklist arrays, and JSON text for complex fields (objects,
arrays of objects, unions). Example: `--records '[{"name":"www","type":"A"}]'`.
Validation is still applied to the whole input before dispatch. All POST commands
get `--idempotency-key`. Commands marked cost OR destructive require `--yes`,
unless a supported `--dry-run` resolves to true. Refusal has code
`CONFIRMATION_REQUIRED` and does not fetch. Library calls deliberately have no
interactive confirmation layer.

Client flags: `--api-key`, `--secret-api-key`, `--base-url`, `--mock`.
Environment: `PORKBUN_API_KEY`, `PORKBUN_SECRET_API_KEY`, `PORKBUN_BASE_URL`.
Flags win; explicit base URL wins over mock, mock wins over environment base URL.
`.env` is loaded automatically; `--env-path` overrides the file. Inherited env
wins over file values. Global flags work before or after the route. Each
invocation emits one JSON Result; success goes to stdout, failure to stderr with
exit 1. Help/version are also JSON Results, not raw ANSI text.

For file IO or other custom CLI input, pass:

```ts
cliEndpointCommandCreate(endpoint, {
  omitFlags: ["content"], // fields supplied by mapper instead of generated flags
  extraFlags: { file: /* Stricli flag definition */ },
  inputMap: async (flags, context) => {
    // Catch filesystem IO failures and return ResultErr.
    // Return the COMPLETE endpoint input, not only the changed fields.
    return createResult({ domain: String(flags.domain), content: loadedText })
  },
})
```

`extraFlags` may override a generated flag; `inputMap` returns
`Result<PorkbunEndpointInput<E>> | Promise<Result<PorkbunEndpointInput<E>>>`.
For custom output (PDF-to-file, etc.), write a context-local Stricli command
using `cliClientCreate`, `cliInputValidate`, the public API function and
`cliResultWrite`; do not change the shared builder just for one endpoint.

## Shared schema catalog

All live under `src/shared/schema/`, with same-file derived PascalCase types:

| Schema | Meaning |
| --- | --- |
| `porkbunDomainSchema` | Trimmed, lowercase DNS hostname; punycode for IDNs |
| `porkbunYesNoSchema`, `porkbunOnOffSchema` | Exact string switches |
| `porkbunCentsSchema` | Integer >= 0; use only for USD cents fields |
| `porkbunDnsRecordTypeSchema` | A, AAAA, MX, CNAME, ALIAS, TXT, NS, SRV, TLSA, CAA, SSHFP, HTTPS, SVCB, DS |
| `porkbunDnsWriteWarningsSchema` | Advisory string array; never treat as a failed write |
| `porkbunStatusSchema` | SUCCESS / ERROR |
| `porkbunBasicResponseSchema` | Required status, optional warnings/message/code |
| `porkbunErrorResponseSchema` | ERROR + message, optional machine code/account/TTL/next_action |
| `porkbunIpResponseSchema` | IpResponse from the spec; shared by ping and IP |
| `porkbunDryRunPreviewSchema` | Complete DryRunPreviewResponse; optional fields match spec |
| `porkbunRateLimitSchema` | One window: optional TTL/limit/used/naturalLanguage |
| `porkbunLimitsSchema` | Optional attempts/success windows; checks use RateLimit directly |
| `porkbunPayWithSchema` | usdc / card |
| `porkbunScopeSchema` | account/dns/domains/email/funding/hosting/none/purchase/read/full |

Use a field's actual spec type rather than a superficially similar shared schema:
not every money-looking value is integer cents, and scope arrays may allow future
strings. Response `a.string()` fields should not be constrained to a picklist
unless the spec declares an enum.

## Tests and verification

Copy `utility/api/*.test.ts` and `shared/porkbunEndpointCall.test.ts`. The
`porkbunTestClient.test.ts` helper supplies a fake fetch, configurable JSON/text
response and HTTP status, and captured requests. Assert method, full URL, path
encoding, omitted path fields, auth/body/headers, success parsing and rejection
of bad responses, and upstream error code/status propagation. No live fetches in
`src/**/*.test.ts`. Shared tests already cover generic transport mechanics;
context tests should focus on their endpoint's actual contract and variants.

Copy `e2e/utility.e2e.ts` to `e2e/<ctx>.e2e.ts`, importing from `../dist/index.js`.
Use `porkbunMockBaseUrl` and dummy credentials, a timeout, and validate each
successful response with its endpoint response schema. Never point automated
write tests at production. Bun does not discover `.e2e.ts` from a directory
argument, so `test:e2e` deliberately passes the explicit `./e2e/*.e2e.ts` glob.

```sh
bun install
bun check
bun run lint                    # biome check src e2e
bun test src                    # offline unit/CLI tests
bun run build
bun run test:e2e                # live MOCK only
node dist/cli.js utility ip
node dist/cli.js --mock utility ping --api-key x --secret-api-key y
```

Infra files were copied from lexware; the publish workflow is byte-identical.
`.npmignore` only adds `spec/` to the copied file; `files:["dist"]` limits package
contents. The copied `.gitignore` ignores Bun lockfiles and workspace files;
the workspace still exists locally. Do not commit from a context agent; let the
orchestrator group and commit the finished work on main.
