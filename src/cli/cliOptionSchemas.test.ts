import { expect, test } from "bun:test"
import * as a from "valibot"
import { cliOptionSchemas } from "./cliOptionSchemas.js"

test("CLI ID flags reject empty identifiers", () => {
  expect(a.safeParse(cliOptionSchemas.id, "id").success).toBe(true)
  expect(a.safeParse(cliOptionSchemas.id, "").success).toBe(false)
})

test("CLI non-empty strings remain available for generic options", () => {
  expect(a.safeParse(cliOptionSchemas.nonEmptyString, "value").success).toBe(true)
  expect(a.safeParse(cliOptionSchemas.nonEmptyString, "").success).toBe(false)
})
