import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"

export const mockEndpointCallEndpoint = porkbunEndpointDefine({
  op: "mockEndpointCall",
  method: "GET",
  path: "/mock/{path}",
  auth: "none",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Call a mock endpoint",
  inputSchema: a.object({
    path: a.pipe(a.string(), a.minLength(1), a.description("Endpoint path to mock")),
    method: a.optional(a.pipe(a.picklist(["GET", "POST"]), a.description("HTTP method"))),
    status: a.optional(a.pipe(a.literal("error"), a.description("Return an error example"))),
  }),
  responseSchema: a.record(a.string(), a.unknown()),
})
export type MockEndpointCallInput = PorkbunEndpointInput<typeof mockEndpointCallEndpoint>
export type MockEndpointCallResponse = PorkbunEndpointOutput<typeof mockEndpointCallEndpoint>
