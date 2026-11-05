import * as a from "valibot"
import { cloudflareMoveStatusSchema } from "./cloudflareMoveStatusSchema.js"

// The operation prose describes per-domain maps; accept legacy array results too.
export const cloudflareMoveResultsSchema = a.union([
  a.array(a.union([a.string(), cloudflareMoveStatusSchema])),
  a.record(a.string(), a.union([a.string(), cloudflareMoveStatusSchema])),
])
