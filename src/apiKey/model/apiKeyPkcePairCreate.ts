/** Request with the challenge, let the account holder approve authUrl, then retrieve with the verifier. */
export async function apiKeyPkcePairCreate(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const encode = (bytes: Uint8Array) =>
    btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
  const codeVerifier = encode(crypto.getRandomValues(new Uint8Array(32)))
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier))
  return { codeVerifier, codeChallenge: encode(new Uint8Array(digest)) }
}
