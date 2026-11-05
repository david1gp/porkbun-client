/** OpenAPI form/explode is the default (arrays repeat their parameter). */
export function porkbunQueryAppend(
  url: URL,
  key: string,
  value: unknown,
  serialization?: {
    readonly style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject"
    readonly explode?: boolean
  },
): void {
  if (value === undefined || value === null) return
  const style = serialization?.style ?? "form"
  const explode = serialization?.explode ?? style === "form"
  if (Array.isArray(value)) {
    if (explode) {
      for (const item of value) url.searchParams.append(key, String(item))
      return
    }
    url.searchParams.append(
      key,
      value.map(String).join(style === "spaceDelimited" ? " " : style === "pipeDelimited" ? "|" : ","),
    )
    return
  }
  if (typeof value === "object") {
    const entries = Object.entries(value)
    if (style === "deepObject" || explode) {
      for (const [property, item] of entries)
        url.searchParams.append(style === "deepObject" ? `${key}[${property}]` : property, String(item))
      return
    }
    url.searchParams.append(key, entries.flatMap(([property, item]) => [property, String(item)]).join(","))
    return
  }
  url.searchParams.append(key, String(value))
}
