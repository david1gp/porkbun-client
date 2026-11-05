import { buildCommand, type Command, type FlagParametersForType } from "@stricli/core"
import { createResultError } from "#result"
import type { PorkbunEndpoint } from "../shared/PorkbunEndpoint.js"
import type { PorkbunEndpointInput } from "../shared/PorkbunEndpointInput.js"
import { porkbunEndpointCall } from "../shared/porkbunEndpointCall.js"
import type { CliEndpointCommandOptions } from "./CliEndpointCommandOptions.js"
import type { CliClientInput } from "./cliClientCreate.js"
import { cliClientCreate } from "./cliClientCreate.js"
import { cliClientOptions } from "./cliClientOptions.js"
import type { CliCommandContext } from "./cliCommandContext.js"
import { cliEndpointFlagCreate } from "./cliEndpointFlagCreate.js"
import { cliInputValidate } from "./cliInputValidate.js"
import { cliOptionCreate } from "./cliOptionCreate.js"
import { cliOptionSchemas } from "./cliOptionSchemas.js"
import { cliResultWrite } from "./cliResultWrite.js"

type Flags = Record<string, unknown> & CliClientInput & { yes?: boolean; idempotencyKey?: string }

export function cliEndpointCommandCreate<E extends PorkbunEndpoint>(
  endpoint: E,
  configuration: CliEndpointCommandOptions<E> = {},
): Command<CliCommandContext> {
  const flags: Command<CliCommandContext>["parameters"]["flags"] = { ...cliClientOptions }
  for (const [name, schema] of Object.entries(endpoint.inputSchema.entries)) {
    if (!configuration.omitFlags?.includes(name)) flags[name] = cliEndpointFlagCreate(schema, name)
  }
  if (endpoint.agent.cost || endpoint.agent.destructive)
    flags.yes = { kind: "boolean", optional: true, brief: "Confirm a paid or destructive operation" }
  if (endpoint.method === "POST")
    flags.idempotencyKey = cliOptionCreate(cliOptionSchemas.nonEmptyString, "Stable key to reuse on retries", {
      optional: true,
    })
  Object.assign(flags, configuration.extraFlags)
  return buildCommand({
    async func(this: CliCommandContext, flags: Flags) {
      const input: Record<string, unknown> = {}
      for (const key of Object.keys(endpoint.inputSchema.entries)) {
        // Stricli returns [] for an omitted optional variadic flag. Omit it so
        // Valibot optional/default semantics remain the source of truth.
        const value = flags[key]
        if (value !== undefined && !(Array.isArray(value) && value.length === 0)) input[key] = value
      }
      let mapped: PorkbunEndpointInput<E> = input as PorkbunEndpointInput<E>
      if (configuration.inputMap !== undefined) {
        const result = await configuration.inputMap(flags, this)
        if (!result.success) {
          cliResultWrite(this.process, result)
          return
        }
        mapped = result.data
      }
      const validated = cliInputValidate(endpoint.inputSchema, mapped, endpoint.op)
      if (!validated.success) {
        cliResultWrite(this.process, validated)
        return
      }
      const dryRun = "dryRun" in endpoint.inputSchema.entries && validated.data.dryRun === true
      if ((endpoint.agent.cost || endpoint.agent.destructive) && flags.yes !== true && !dryRun) {
        cliResultWrite(this.process, {
          ...createResultError(
            endpoint.op,
            "This operation costs money or is destructive. Pass --yes to confirm, or --dry-run when supported.",
          ),
          code: "CONFIRMATION_REQUIRED",
        })
        return
      }
      const client = cliClientCreate(flags, this.process.env)
      if (!client.success) {
        cliResultWrite(this.process, client)
        return
      }
      cliResultWrite(
        this.process,
        await porkbunEndpointCall(client.data, endpoint, mapped, { idempotencyKey: flags.idempotencyKey }),
      )
    },
    // This assertion is the runtime-schema/Stricli boundary. Every generated
    // flag is typed as a Stricli Flag above; the final input is validated again.
    parameters: { flags: flags as FlagParametersForType<Flags, CliCommandContext> },
    docs: { brief: endpoint.brief },
  })
}
