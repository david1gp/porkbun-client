import * as a from "valibot"
import { createResult, createResultError, type PromiseResult } from "#result"
import type { PorkbunClient } from "./PorkbunClient.js"
import type { PorkbunEndpoint } from "./PorkbunEndpoint.js"
import type { PorkbunEndpointInput } from "./PorkbunEndpointInput.js"
import type { PorkbunEndpointOutput } from "./PorkbunEndpointOutput.js"
import type { PorkbunRequestOptions } from "./PorkbunRequestOptions.js"
import { porkbunEndpointRequestCreate } from "./porkbunEndpointRequestCreate.js"
import { porkbunErrorResultCreate } from "./porkbunErrorResultCreate.js"

export async function porkbunEndpointCall<E extends PorkbunEndpoint>(
  client: PorkbunClient,
  endpoint: E,
  input: PorkbunEndpointInput<E>,
  options: PorkbunRequestOptions = {},
): PromiseResult<PorkbunEndpointOutput<E>> {
  const op = endpoint.op
  const parsed = a.safeParse(endpoint.inputSchema, input)
  if (!parsed.success) return createResultError(op, a.summarize(parsed.issues), inputErrorData(input))
  if (endpoint.auth === "required" && (!client.apiKey || !client.secretApiKey)) {
    return {
      ...createResultError(
        op,
        "Set apiKey and secretApiKey (CLI: --api-key / --secret-api-key or PORKBUN_API_KEY / PORKBUN_SECRET_API_KEY). Create keys at https://porkbun.com/account/api.",
      ),
      code: "API_KEY_REQUIRED",
    }
  }
  const request = porkbunEndpointRequestCreate(client, endpoint, parsed.output, options)
  if (!request.success) return request
  let response: Response
  let text: string
  try {
    response = await client.fetch(request.data.url, request.data.init)
    text = await response.text()
  } catch (error) {
    return createResultError(op, "Request failed", error instanceof Error ? error.message : String(error))
  }
  let body: unknown
  try {
    body = JSON.parse(text)
  } catch {
    if (!response.ok) return porkbunErrorResultCreate(op, undefined, response.status, text)
    return { ...createResultError(op, "API returned non-JSON response", text), statusCode: response.status }
  }
  if (!response.ok || (typeof body === "object" && body !== null && "status" in body && body.status === "ERROR")) {
    return porkbunErrorResultCreate(op, body, response.status, text)
  }
  const result = a.safeParse(endpoint.responseSchema, body)
  if (!result.success) return createResultError(op, a.summarize(result.issues), text)
  return createResult(result.output)
}

function inputErrorData(input: unknown): string | null {
  try {
    return JSON.stringify(input) ?? null
  } catch {
    return null
  }
}
