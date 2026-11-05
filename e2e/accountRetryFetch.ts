/** Retry transient mock-server gateway failures; production clients do not retry writes. */
export const accountRetryFetch: typeof fetch = async (input, init) => {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(input, init)
    if (![429, 502, 503, 504].includes(response.status) || attempt >= 4 || init?.signal?.aborted) return response
    await response.body?.cancel()
    await Bun.sleep(250 * (attempt + 1))
  }
}
