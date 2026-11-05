import { expect, test } from "bun:test"
import * as a from "valibot"
import type { PorkbunEndpointInput } from "./PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "./PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "./porkbunEndpointDefine.js"

const definition = {
  op: "test",
  method: "POST",
  path: "/{domain}",
  auth: "none",
  scope: "none",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Test",
  inputSchema: a.object({ domain: a.string() }),
  responseSchema: a.looseObject({ count: a.number() }),
} as const
const endpoint = porkbunEndpointDefine(definition)
// @ts-expect-error Placeholders must be input schema entries.
porkbunEndpointDefine({ ...definition, path: "/{missing}" })
const input: PorkbunEndpointInput<typeof endpoint> = { domain: "example.com" }
const output: PorkbunEndpointOutput<typeof endpoint> = { count: 1 }
// @ts-expect-error Response output is not untyped.
const invalid: PorkbunEndpointOutput<typeof endpoint> = { count: "1" }
void invalid

test("endpoint definitions retain their exact schemas and inferred types", () => {
  expect(endpoint.inputSchema).toBe(definition.inputSchema)
  expect(a.safeParse(endpoint.inputSchema, input).success).toBe(true)
  expect(a.safeParse(endpoint.responseSchema, output).success).toBe(true)
})

const optionalDefinition = {
  ...definition,
  inputSchema: a.object({ domain: a.string(), subdomain: a.optional(a.string()) }),
}
porkbunEndpointDefine({ ...optionalDefinition, path: "/{domain}/{subdomain?}" })
// @ts-expect-error Optional placeholders must exist in the input.
porkbunEndpointDefine({ ...optionalDefinition, path: "/{missing?}" })
// @ts-expect-error Optional placeholders must map to optional inputs.
porkbunEndpointDefine({ ...optionalDefinition, path: "/{domain?}" })
// @ts-expect-error Required placeholders must map to required inputs.
porkbunEndpointDefine({ ...optionalDefinition, path: "/{subdomain}" })
// @ts-expect-error Optional placeholders must be trailing full segments.
porkbunEndpointDefine({ ...optionalDefinition, path: "/{subdomain?}/{domain}" })
// @ts-expect-error Optional placeholders cannot be embedded in a segment.
porkbunEndpointDefine({ ...optionalDefinition, path: "/prefix-{subdomain?}" })
const multipleOptionalDefinition = {
  ...definition,
  inputSchema: a.object({ first: a.optional(a.string()), last: a.optional(a.string()) }),
}
porkbunEndpointDefine({ ...multipleOptionalDefinition, path: "/test/{first?}/{last?}" })
// @ts-expect-error A literal segment cannot follow an optional segment.
porkbunEndpointDefine({ ...multipleOptionalDefinition, path: "/test/{first?}/literal/{last?}" })
