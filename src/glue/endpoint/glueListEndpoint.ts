import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const glueListEndpoint = porkbunEndpointDefine({
  op: "glueList",
  method: "POST",
  path: "/domain/getGlue/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Get glue records",
  inputSchema: a.object({ domain: a.pipe(porkbunDomainSchema, a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.optional(a.string()),
    hosts: a.optional(
      // The live mock emits one-element tuples, despite the documented two-element shape.
      a.array(a.tuple([a.string(), a.optional(a.looseObject({ v4: a.array(a.string()), v6: a.array(a.string()) }))])),
    ),
    glue: a.optional(a.array(a.looseObject({ host: a.string(), v4: a.array(a.string()), v6: a.array(a.string()) }))),
  }),
})
export type GlueListInput = PorkbunEndpointInput<typeof glueListEndpoint>
export type GlueListResponse = PorkbunEndpointOutput<typeof glueListEndpoint>
