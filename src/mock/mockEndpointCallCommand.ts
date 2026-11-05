import { buildCommand, type FlagParametersForType } from "@stricli/core"
import type { CliClientInput } from "../cli/cliClientCreate.js"
import { cliClientCreate } from "../cli/cliClientCreate.js"
import { cliClientOptions } from "../cli/cliClientOptions.js"
import type { CliCommandContext } from "../cli/cliCommandContext.js"
import { cliEndpointFlagCreate } from "../cli/cliEndpointFlagCreate.js"
import { cliInputValidate } from "../cli/cliInputValidate.js"
import { cliResultWrite } from "../cli/cliResultWrite.js"
import { mockEndpointCall } from "./api/mockEndpointCall.js"
import { mockEndpointCallEndpoint } from "./endpoint/mockEndpointCallEndpoint.js"

type Flags = CliClientInput & { path: string; method?: "GET" | "POST"; status?: "error" }
const entries = mockEndpointCallEndpoint.inputSchema.entries
export const mockEndpointCallCommand = buildCommand({
  async func(this: CliCommandContext, flags: Flags) {
    const input = cliInputValidate(mockEndpointCallEndpoint.inputSchema, flags, "mockEndpointCall")
    if (!input.success) return cliResultWrite(this.process, input)
    const client = cliClientCreate(flags, this.process.env)
    if (!client.success) return cliResultWrite(this.process, client)
    cliResultWrite(this.process, await mockEndpointCall(client.data, input.data))
  },
  parameters: {
    flags: {
      ...cliClientOptions,
      path: cliEndpointFlagCreate(entries.path, "path"),
      method: cliEndpointFlagCreate(entries.method, "method"),
      status: cliEndpointFlagCreate(entries.status, "status"),
    } as FlagParametersForType<Flags, CliCommandContext>,
  },
  docs: { brief: "Call a mock endpoint" },
})
