import * as a from "valibot"
import { createResult, createResultError, type PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import { porkbunErrorResultCreate } from "../../shared/porkbunErrorResultCreate.js"
import {
  type MockEndpointCallInput,
  type MockEndpointCallResponse,
  mockEndpointCallEndpoint,
} from "../endpoint/mockEndpointCallEndpoint.js"

export async function mockEndpointCall(
  client: PorkbunClient,
  input: MockEndpointCallInput,
): PromiseResult<MockEndpointCallResponse> {
  const op = "mockEndpointCall"
  const parsed = a.safeParse(mockEndpointCallEndpoint.inputSchema, input)
  if (!parsed.success) return createResultError(op, a.summarize(parsed.issues))
  const path = parsed.output.path.replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/")
  if (!path || path.split("/").some((part) => part === "." || part === ".." || part === ""))
    return createResultError(op, "Invalid mock path")
  const url = `${client.baseUrl}/mock/${path}${parsed.output.status ? "?status=error" : ""}`
  let response: Response
  let text: string
  try {
    response = await client.fetch(url, {
      method: parsed.output.method ?? "GET",
      headers: {
        accept: "application/json",
        ...(parsed.output.method === "POST" ? { "content-type": "application/json" } : {}),
      },
      ...(parsed.output.method === "POST" ? { body: "{}" } : {}),
    })
    text = await response.text()
  } catch (error) {
    return createResultError(op, "Request failed", String(error))
  }
  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    return createResultError(op, "API returned non-JSON response", text)
  }
  if (!response.ok) return porkbunErrorResultCreate(op, json, response.status, text)
  const result = a.safeParse(mockEndpointCallEndpoint.responseSchema, json)
  if (!result.success) return createResultError(op, a.summarize(result.issues))
  return createResult(result.output)
}
