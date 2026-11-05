import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import type * as a from "valibot"
import { porkbunEndpointList } from "./porkbunEndpointList.js"
import type { PorkbunEndpoint } from "./shared/PorkbunEndpoint.js"

type SpecNode = {
  description?: string
  $ref?: string
  allOf?: SpecNode[]
  oneOf?: SpecNode[]
  anyOf?: SpecNode[]
  properties?: Record<string, SpecNode>
  required?: string[] | boolean
  parameters?: SpecNode[]
  name?: string
  in?: string
  schema?: SpecNode
  requestBody?: SpecNode
  content?: Record<string, SpecNode>
  responses?: Record<string, SpecNode>
  security?: unknown[]
  "x-porkbun-scope"?: string
  "x-porkbun-agent"?: Record<string, boolean | string>
}
const spec = JSON.parse(readFileSync(new URL("../spec/porkbun-openapi.json", import.meta.url), "utf8")) as {
  paths: Record<string, { get?: SpecNode; post?: SpecNode; parameters?: SpecNode[] }>
  components: Record<string, Record<string, SpecNode>>
}

function resolve(node: SpecNode = {}): SpecNode {
  if (!node.$ref) return node
  const [, , group, name] = node.$ref.split("/")
  const target = spec.components[group ?? ""]?.[name ?? ""]
  if (!target) throw new Error(`Unresolved reference: ${node.$ref}`)
  return resolve(target)
}

function properties(node: SpecNode = {}): Record<string, SpecNode> {
  const resolved = resolve(node)
  return Object.assign(
    {},
    resolved.properties,
    ...(resolved.allOf ?? []).map(properties),
    ...(resolved.oneOf ?? resolved.anyOf ?? []).map(properties),
  )
}

function required(node: SpecNode = {}): string[] {
  const resolved = resolve(node)
  return [...(Array.isArray(resolved.required) ? resolved.required : []), ...(resolved.allOf ?? []).flatMap(required)]
}

function jsonSchema(node: SpecNode = {}): SpecNode {
  return resolve(node).content?.["application/json"]?.schema ?? {}
}

function pathNormalize(path: string): string {
  return path.replace(/\?\}/g, "}")
}

function responseKeys(schema: a.GenericSchema): string[] {
  if ("entries" in schema) return Object.keys(schema.entries as a.ObjectEntries)
  if ("options" in schema) return (schema.options as a.GenericSchema[]).flatMap(responseKeys)
  if ("wrapped" in schema) return responseKeys(schema.wrapped as a.GenericSchema)
  return []
}

// Explicit, field-specific exceptions to known omissions in the checked-in OpenAPI document.
const exceptions: {
  extra: Record<string, { operations: readonly string[]; reason: string }>
  optional: Record<string, Record<string, string>>
  public: Record<string, string>
} = {
  extra: {
    dryRun: {
      // Hosting/Cloudflare/Link in Bio promise this in the operation descriptions;
      // DNS/nameservers document it in spec/api-description.md and docs/architecture.md.
      reason: "Documented validate-only mode; missing from the OpenAPI request property list",
      operations: [
        "cloudflareDisconnect",
        "cloudflareMoveRetry",
        "cloudflareMoveRollback",
        "dnsImport",
        "dnsRecordDelete",
        "dnsRecordDeleteByNameType",
        "dnsRecordEdit",
        "dnsRecordEditByNameType",
        "domainNameserverUpdate",
        "hostingAutoRenewUpdate",
        "hostingBackupCreate",
        "hostingBackupDelete",
        "hostingBackupRestore",
        "hostingPhpVersionSet",
        "hostingSearchVisibilitySet",
        "hostingSslReissue",
        "hostingStagingCreate",
        "hostingStagingDelete",
        "hostingStagingEnvironmentSet",
        "hostingStagingGateSet",
        "hostingStagingGuardSet",
        "hostingStagingPublish",
        "hostingStagingReset",
        "hostingWordPressVersionSet",
        "linkInBioAppearanceUpdate",
        "linkInBioCreate",
        "linkInBioLinkCreate",
        "linkInBioLinkDelete",
        "linkInBioLinkEdit",
        "linkInBioLinkReorder",
        "linkInBioProfileUpdate",
        "linkInBioSettingsUpdate",
        "linkInBioSocialsUpdate",
      ],
    },
    method: {
      reason: "Transport selector for the custom mock helper, never a body/query field",
      operations: ["mockEndpointCall"],
    },
  },
  optional: {},
  // The mock operation descriptions explicitly say credential-free but omit security: [].
  public: {
    mockEndpointCall: "Credential-free mock operation; upstream omitted security: []",
    mockEndpointList: "Credential-free mock catalog; upstream omitted security: []",
  },
}

const endpoints: readonly PorkbunEndpoint[] = porkbunEndpointList
const operations = Object.entries(spec.paths).flatMap(([path, methods]) =>
  (["get", "post"] as const).flatMap((method) => {
    const operation = methods[method]
    return operation ? [{ path, method: method.toUpperCase(), operation }] : []
  }),
)

describe("endpoint registry spec coverage", () => {
  test(`covers all ${operations.length} spec method/path pairs, including GET/POST mirrors`, () => {
    const uncovered = operations.filter(({ path }) => {
      // mockEndpointCall handles slash-separated paths itself rather than generic path encoding.
      if (path === "/mock/{path}") return !endpoints.some((endpoint) => endpoint.op === "mockEndpointCall")
      return !endpoints.some((endpoint) => pathNormalize(endpoint.path) === path)
    })
    expect(uncovered.map(({ method, path }) => `${method} ${path}`)).toEqual([])
  })

  test("has no duplicate operation names or paths", () => {
    expect(new Set(endpoints.map((endpoint) => endpoint.op)).size).toBe(endpoints.length)
    // GET /account/autoTopup reads settings; POST configures them, so this is not a mirror.
    const singleOperationPaths = endpoints.filter((endpoint) => endpoint.path !== "/account/autoTopup")
    expect(new Set(singleOperationPaths.map((endpoint) => pathNormalize(endpoint.path))).size).toBe(
      singleOperationPaths.length,
    )
    expect(new Set(endpoints.map((endpoint) => `${endpoint.method} ${pathNormalize(endpoint.path)}`)).size).toBe(
      endpoints.length,
    )
  })

  test("keeps every exception documented and limited to a registered operation/field", () => {
    for (const [field, exception] of Object.entries(exceptions.extra)) {
      expect(exception.reason.length).toBeGreaterThan(0)
      for (const op of exception.operations) {
        const endpoint = endpoints.find((candidate) => candidate.op === op)
        expect(endpoint, op).toBeDefined()
        expect(endpoint?.inputSchema.entries[field], `${op}.${field}`).toBeDefined()
      }
    }
    for (const [op, reason] of Object.entries(exceptions.public)) {
      expect(reason.length).toBeGreaterThan(0)
      expect(endpoints.find((endpoint) => endpoint.op === op)?.auth).toBe("none")
    }
  })
})

for (const endpoint of endpoints) {
  describe(endpoint.op, () => {
    const path = spec.paths[pathNormalize(endpoint.path)]
    const operation = path?.[endpoint.method === "GET" ? "get" : "post"]
    test("matches spec scope, agent metadata and public authentication", () => {
      expect(operation, `${endpoint.method} ${endpoint.path} must exist`).toBeDefined()
      if (!operation) return
      expect<string | undefined>(endpoint.scope).toBe(operation["x-porkbun-scope"])
      const agent = { ...operation["x-porkbun-agent"] }
      if (agent.cost === "none") agent.cost = false
      expect<Record<string, boolean | string>>(endpoint.agent).toEqual(agent)
      if (endpoint.auth === "none" && !exceptions.public[endpoint.op]) expect(operation.security).toEqual([])
    })

    test("models exactly the spec request properties and required fields", () => {
      if (!operation) throw new Error("Missing spec operation")
      const body = jsonSchema(resolve(operation.requestBody))
      const fields = properties(body)
      const requiredFields = new Set(required(body))
      const parameters = [...(path?.parameters ?? []), ...(operation.parameters ?? [])]
      for (const parameter of parameters.map(resolve)) {
        if (parameter.in !== "path" && parameter.in !== "query") continue
        if (!parameter.name) throw new Error("Unnamed parameter")
        fields[parameter.name] = parameter.schema ?? {}
        if (parameter.required) requiredFields.add(parameter.name)
      }
      delete fields.apikey
      delete fields.secretapikey
      requiredFields.delete("apikey")
      requiredFields.delete("secretapikey")
      const entries = endpoint.inputSchema.entries
      expect(
        Object.keys(fields).filter((key) => !(key in entries)),
        "missing input fields",
      ).toEqual([])
      expect(
        Object.keys(entries).filter(
          (key) => !(key in fields) && !exceptions.extra[key]?.operations.includes(endpoint.op),
        ),
        "undocumented input fields",
      ).toEqual([])
      expect(
        [...requiredFields].filter(
          (key) =>
            entries[key] &&
            ["optional", "exact_optional", "nullish"].includes(entries[key].type) &&
            !exceptions.optional[endpoint.op]?.[key],
        ),
        "required fields must not be optional",
      ).toEqual([])
    })

    test("models every top-level 200 response property (across union options)", () => {
      if (!operation) throw new Error("Missing spec operation")
      const fields = Object.keys(properties(jsonSchema(resolve(operation.responses?.["200"]))))
      const keys = responseKeys(endpoint.responseSchema)
      expect(fields.filter((key) => !keys.includes(key))).toEqual([])
    })
  })
}
