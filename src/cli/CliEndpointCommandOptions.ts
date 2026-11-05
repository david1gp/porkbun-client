import type { Command } from "@stricli/core"
import type { Result } from "#result"
import type { PorkbunEndpoint } from "../shared/PorkbunEndpoint.js"
import type { PorkbunEndpointInput } from "../shared/PorkbunEndpointInput.js"
import type { CliCommandContext } from "./cliCommandContext.js"

/** Escape hatch for file IO and other context-specific CLI input preparation. */
export type CliEndpointCommandOptions<E extends PorkbunEndpoint> = {
  /** Suppress generated flags supplied by inputMap (e.g. remote content read from a local file). */
  readonly omitFlags?: readonly (keyof E["inputSchema"]["entries"])[]
  readonly extraFlags?: Command<CliCommandContext>["parameters"]["flags"]
  readonly inputMap?: (
    flags: Readonly<Record<string, unknown>>,
    context: CliCommandContext,
  ) => Result<PorkbunEndpointInput<E>> | Promise<Result<PorkbunEndpointInput<E>>>
}
