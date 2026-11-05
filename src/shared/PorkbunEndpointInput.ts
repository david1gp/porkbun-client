import type * as a from "valibot"
import type { PorkbunEndpoint } from "./PorkbunEndpoint.js"
export type PorkbunEndpointInput<E extends PorkbunEndpoint> = a.InferInput<E["inputSchema"]>
