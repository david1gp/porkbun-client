import { expect, test } from "bun:test"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { hostingBackupRestore } from "./hostingBackupRestore.js"
import { hostingCreate } from "./hostingCreate.js"
import { hostingFileDeploy } from "./hostingFileDeploy.js"
import { hostingFileList } from "./hostingFileList.js"

test("hosting deploy sends base64 files and encodes the domain", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", deployed: ["index.html"] })
  const result = await hostingFileDeploy(client, {
    domain: "example.com",
    files: [{ path: "index.html", content: "aGk=" }],
  })
  expect(result.success).toBe(true)
  expect(calls[0]?.url).toEndWith("/hosting/deploy/example.com")
  expect(calls[0]?.init?.method).toBe("POST")
  expect(calls[0]?.body).toMatchObject({ files: [{ path: "index.html", content: "aGk=" }] })
})
test("hosting file listing sends a GET request without a body", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", files: [] })
  expect((await hostingFileList(client, { domain: "example.com" })).success).toBe(true)
  expect(calls[0]?.url).toEndWith("/hosting/files/example.com")
  expect(calls[0]?.body).toBeUndefined()
  expect(calls[0]?.init?.method).toBe("GET")
})
test("backup restore includes both backup ids and staging selection", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", operation: { id: 42, state: "queued" } })
  expect(
    (await hostingBackupRestore(client, { domain: "example.com", fsId: "files", dbId: "db", staging: true })).success,
  ).toBe(true)
  expect(calls[0]?.body).toMatchObject({ fsId: "files", dbId: "db", staging: true })
})
test("hosting purchase validates SKU and cost before sending", async () => {
  const { client, calls } = porkbunTestClient({ status: "SUCCESS", charged: 300 })
  expect(
    (
      await hostingCreate(client, {
        domain: "example.com",
        sku: "PIXIESECURESTATICM2",
        acknowledgedCost: 300,
        agreeToTerms: "yes",
      })
    ).success,
  ).toBe(true)
  expect(calls[0]?.body).toMatchObject({ sku: "PIXIESECURESTATICM2", acknowledgedCost: 300, agreeToTerms: "yes" })
})
