export type PorkbunRequestOptions = {
  idempotencyKey?: string
  headers?: Record<string, string>
  signal?: AbortSignal
}
