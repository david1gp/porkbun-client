import { createResult, createResultError, type PromiseResult } from "#result"
import type { PorkbunClient } from "../../shared/PorkbunClient.js"
import type { HostingFileDeployInput, HostingFileDeployResponse } from "../endpoint/hostingFileDeployEndpoint.js"
import { hostingFileDeploy } from "./hostingFileDeploy.js"

/** Keep each serialized request, including credentials, within the API's 10 MB limit. */
export async function hostingFileDeployBatched(
  client: PorkbunClient,
  input: HostingFileDeployInput,
): PromiseResult<HostingFileDeployResponse> {
  const batches: HostingFileDeployInput["files"][] = []
  let batch: HostingFileDeployInput["files"] = []
  const size = (files: HostingFileDeployInput["files"]) =>
    Buffer.byteLength(JSON.stringify({ files, apikey: client.apiKey, secretapikey: client.secretApiKey }))
  for (const file of input.files) {
    if (size([file]) > 10_000_000)
      return createResultError(
        "hostingFileDeployBatched",
        `File ${file.path ?? "(unnamed)"} exceeds the 10 MB request limit`,
      )
    if (size([...batch, file]) > 10_000_000) {
      batches.push(batch)
      batch = []
    }
    batch.push(file)
  }
  if (batch.length) batches.push(batch)
  const deployed: string[] = []
  const skipped: NonNullable<HostingFileDeployResponse["skipped"]> = []
  for (const [index, files] of batches.entries()) {
    const result = await hostingFileDeploy(client, { domain: input.domain, files })
    if (!result.success)
      return {
        ...result,
        errorMessage: `Batch ${index + 1}/${batches.length} failed after deploying ${JSON.stringify(deployed)}: ${result.errorMessage}`,
        errorData: JSON.stringify({ batch: index + 1, deployed, skipped, cause: result }),
      }
    deployed.push(...(result.data.deployed ?? []))
    skipped.push(...(result.data.skipped ?? []))
  }
  return createResult({ status: "SUCCESS", deployed, skipped })
}
