import type * as a from "valibot"
import type { PorkbunEndpoint } from "./PorkbunEndpoint.js"
export type PorkbunEndpointOutput<E extends PorkbunEndpoint> = a.InferOutput<E["responseSchema"]>
