import * as a from "valibot"
export const transferStatusSchema = a.picklist([
  "NEW",
  "PENDINGAUTH",
  "PENDINGSUBMIT",
  "PENDINGTRANSFER",
  "DONE",
  "CANCELED",
  "INIT",
])
