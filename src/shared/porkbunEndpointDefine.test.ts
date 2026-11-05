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
