import { createResult, createResultError, type Result } from "#result"
import type { PorkbunClient } from "./PorkbunClient.js"
import type { PorkbunEndpoint } from "./PorkbunEndpoint.js"
import type { PorkbunRequestOptions } from "./PorkbunRequestOptions.js"
import { porkbunQueryAppend } from "./porkbunQueryAppend.js"

/** Input must already be validated. Serialization/URL/header errors remain Results. */
export function porkbunEndpointRequestCreate(
  client: PorkbunClient,
  endpoint: PorkbunEndpoint,
  input: Record<string, unknown>,
  options: PorkbunRequestOptions,
): Result<{ url: URL; init: RequestInit }> {
  try {
    const fields: Record<string, unknown> = { ...input }
    for (const match of endpoint.path.matchAll(/\{([^}]+)\}/g)) {
      const key = match[1]!
      if (input[key] === undefined || input[key] === null)
        return { ...createResultError(endpoint.op, `Missing path parameter: ${key}`), code: "INVALID_PATH_PARAMETER" }
    }
    const path = endpoint.path.replace(/\{([^}]+)\}/g, (_match, key: string) => {
      const value = input[key]
      delete fields[key]
      return encodeURIComponent(String(value))
    })
    const url = new URL(`${client.baseUrl}${path}`)
    const headers = new Headers(options.headers)
    headers.set("Accept", "application/json")
    headers.set("User-Agent", client.userAgent)
    const init: RequestInit = { method: endpoint.method, headers, signal: options.signal }
    if (endpoint.method === "GET") {
      for (const [key, value] of Object.entries(fields)) porkbunQueryAppend(url, key, value, endpoint.query?.[key])
      if (endpoint.auth === "required") {
        headers.set("X-API-Key", client.apiKey!)
        headers.set("X-Secret-API-Key", client.secretApiKey!)
      }
    } else {
      headers.set("Content-Type", "application/json")
      if (endpoint.auth === "required") {
        fields.apikey = client.apiKey
        fields.secretapikey = client.secretApiKey
      }
      init.body = JSON.stringify(fields)
      const key =
        options.idempotencyKey ??
        headers.get("Idempotency-Key") ??
        (!endpoint.agent.safe ? crypto.randomUUID() : undefined)
      if (key !== undefined) headers.set("Idempotency-Key", key)
    }
    return createResult({ url, init })
  } catch (error) {
    return createResultError(
      endpoint.op,
      "Request serialization failed",
      error instanceof Error ? error.message : String(error),
    )
  }
}
