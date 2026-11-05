import * as a from "valibot"
import type { PorkbunEndpointInput } from "../../shared/PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "../../shared/PorkbunEndpointOutput.js"
import { porkbunEndpointDefine } from "../../shared/porkbunEndpointDefine.js"
import { porkbunBasicResponseSchema } from "../../shared/schema/porkbunBasicResponseSchema.js"
import { porkbunDomainSchema } from "../../shared/schema/porkbunDomainSchema.js"
export const urlForwardCreateEndpoint = porkbunEndpointDefine({
  op: "urlForwardCreate",
  method: "POST",
  path: "/domain/addUrlForward/{domain}",
  auth: "required",
  scope: "dns",
  agent: { safe: false, cost: false, destructive: false, reversible: true, requiresConfirmation: false },
  brief: "Add URL forward",
  inputSchema: a.object({
    domain: a.pipe(porkbunDomainSchema, a.description("domain")),
    subdomain: a.optional(
      a.pipe(
        a.string(),
        a.description(
          "Subdomain to forward (optional, leave blank or omit for root domain). Alphanumeric and hyphens only.",
        ),
      ),
    ),
    location: a.pipe(a.string(), a.description("Destination URL to forward to")),
    type: a.pipe(
      a.picklist(["temporary", "permanent", "masked"]),
      a.description(
        "Redirect kind. 'permanent' = HTTP 301; 'temporary' = HTTP 302 (default); 'masked' = loads the destination in a frame (URL masking). For a precise code \u2014 including a 307 temporary r",
      ),
    ),
    redirectType: a.optional(
      a.pipe(
        a.picklist(["301", "302", "307", "masked"]),
        a.description(
          "Optional. The exact redirect type; takes precedence over `type` when supplied. 301 = permanent, 302 or 307 = temporary (this is how you request 307), masked = URL masking. Omit to ",
        ),
      ),
    ),
    includePath: a.pipe(
      a.picklist(["yes", "no"]),
      a.description("Whether to append the request URI path to the forwarding destination"),
    ),
    wildcard: a.pipe(
      a.picklist(["yes", "no"]),
      a.description("Whether to also forward all subdomains of the forwarded subdomain"),
    ),
  }),
  responseSchema: porkbunBasicResponseSchema,
})
export type UrlForwardCreateInput = PorkbunEndpointInput<typeof urlForwardCreateEndpoint>
export type UrlForwardCreateResponse = PorkbunEndpointOutput<typeof urlForwardCreateEndpoint>
