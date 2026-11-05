import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const urlForwardListEndpoint = porkbunEndpointDefine({
  op: "urlForwardList",
  method: "POST",
  path: "/domain/getUrlForwarding/{domain}",
  auth: "required",
  scope: "read",
  agent: { safe: true, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "List URL forwards",
  inputSchema: a.object({ domain: a.pipe(porkbunDomainSchema, a.description("domain")) }),
  responseSchema: a.looseObject({
    status: a.string(),
    forwards: a.array(
      a.looseObject({
        id: a.optional(a.string()),
        subdomain: a.optional(a.string()),
        location: a.optional(a.string()),
        type: a.optional(a.picklist(["permanent", "temporary", "masked"])),
        redirectType: a.optional(a.picklist(["301", "302", "307", "masked"])),
        includePath: a.optional(a.picklist(["yes", "no"])),
        wildcard: a.optional(a.picklist(["yes", "no"])),
      }),
    ),
  }),
})
export type UrlForwardListInput = PorkbunEndpointInput<typeof urlForwardListEndpoint>
export type UrlForwardListResponse = PorkbunEndpointOutput<typeof urlForwardListEndpoint>
