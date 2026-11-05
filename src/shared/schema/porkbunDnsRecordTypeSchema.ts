import * as a from "valibot"

export const porkbunDnsRecordTypeSchema = a.picklist([
  "A",
  "AAAA",
  "MX",
  "CNAME",
  "ALIAS",
  "TXT",
  "NS",
  "SRV",
  "TLSA",
  "CAA",
  "SSHFP",
  "HTTPS",
  "SVCB",
  "DS",
])
export type PorkbunDnsRecordType = a.InferOutput<typeof porkbunDnsRecordTypeSchema>
