import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
export const mockEndpointListEndpoint = porkbunEndpointDefine({
  op: "mockEndpointList",
  method: "GET",
  path: "/mock",
  auth: "none",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Mock server: list mockable endpoints",
  inputSchema: a.object({}),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    mock: a.optional(a.boolean()),
    count: a.optional(a.pipe(a.number(), a.integer())),
    endpoints: a.optional(
      a.array(
        a.looseObject({
          method: a.optional(a.string()),
          path: a.optional(a.string()),
          summary: a.optional(a.string()),
          mockUrl: a.optional(a.string()),
        }),
      ),
    ),
  }),
})
export type MockEndpointListInput = PorkbunEndpointInput<typeof mockEndpointListEndpoint>
export type MockEndpointListResponse = PorkbunEndpointOutput<typeof mockEndpointListEndpoint>
