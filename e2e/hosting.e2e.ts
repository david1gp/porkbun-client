import { expect, test } from "bun:test"
import * as a from "valibot"
import { hostingAutoRenewUpdate } from "../src/hosting/api/hostingAutoRenewUpdate.js"
import { hostingBackupCreate } from "../src/hosting/api/hostingBackupCreate.js"
import { hostingBackupDelete } from "../src/hosting/api/hostingBackupDelete.js"
import { hostingBackupList } from "../src/hosting/api/hostingBackupList.js"
import { hostingBackupRestore } from "../src/hosting/api/hostingBackupRestore.js"
import { hostingCreate } from "../src/hosting/api/hostingCreate.js"
import { hostingDelete } from "../src/hosting/api/hostingDelete.js"
import { hostingDirCreate } from "../src/hosting/api/hostingDirCreate.js"
import { hostingFileDelete } from "../src/hosting/api/hostingFileDelete.js"
import { hostingFileDeploy } from "../src/hosting/api/hostingFileDeploy.js"
import { hostingFileList } from "../src/hosting/api/hostingFileList.js"
import { hostingGet } from "../src/hosting/api/hostingGet.js"
import { hostingPhpVersionSet } from "../src/hosting/api/hostingPhpVersionSet.js"
import { hostingPlanList } from "../src/hosting/api/hostingPlanList.js"
import { hostingSearchVisibilitySet } from "../src/hosting/api/hostingSearchVisibilitySet.js"
import { hostingSslReissue } from "../src/hosting/api/hostingSslReissue.js"
import { hostingStagingCreate } from "../src/hosting/api/hostingStagingCreate.js"
import { hostingStagingDelete } from "../src/hosting/api/hostingStagingDelete.js"
import { hostingStagingEnvironmentSet } from "../src/hosting/api/hostingStagingEnvironmentSet.js"
import { hostingStagingGateSet } from "../src/hosting/api/hostingStagingGateSet.js"
import { hostingStagingGet } from "../src/hosting/api/hostingStagingGet.js"
import { hostingStagingGuardSet } from "../src/hosting/api/hostingStagingGuardSet.js"
import { hostingStagingPublish } from "../src/hosting/api/hostingStagingPublish.js"
import { hostingStagingReset } from "../src/hosting/api/hostingStagingReset.js"
import { hostingWordPressVersionSet } from "../src/hosting/api/hostingWordPressVersionSet.js"
import { hostingWpCredentialCreate } from "../src/hosting/api/hostingWpCredentialCreate.js"
import { hostingWpCredentialDelete } from "../src/hosting/api/hostingWpCredentialDelete.js"
import { hostingWpCredentialList } from "../src/hosting/api/hostingWpCredentialList.js"
import { hostingAutoRenewUpdateEndpoint } from "../src/hosting/endpoint/hostingAutoRenewUpdateEndpoint.js"
import { hostingBackupCreateEndpoint } from "../src/hosting/endpoint/hostingBackupCreateEndpoint.js"
import { hostingBackupDeleteEndpoint } from "../src/hosting/endpoint/hostingBackupDeleteEndpoint.js"
import { hostingBackupListEndpoint } from "../src/hosting/endpoint/hostingBackupListEndpoint.js"
import { hostingBackupRestoreEndpoint } from "../src/hosting/endpoint/hostingBackupRestoreEndpoint.js"
import { hostingCreateEndpoint } from "../src/hosting/endpoint/hostingCreateEndpoint.js"
import { hostingDeleteEndpoint } from "../src/hosting/endpoint/hostingDeleteEndpoint.js"
import { hostingDirCreateEndpoint } from "../src/hosting/endpoint/hostingDirCreateEndpoint.js"
import { hostingFileDeleteEndpoint } from "../src/hosting/endpoint/hostingFileDeleteEndpoint.js"
import { hostingFileDeployEndpoint } from "../src/hosting/endpoint/hostingFileDeployEndpoint.js"
import { hostingFileListEndpoint } from "../src/hosting/endpoint/hostingFileListEndpoint.js"
import { hostingGetEndpoint } from "../src/hosting/endpoint/hostingGetEndpoint.js"
import { hostingPhpVersionSetEndpoint } from "../src/hosting/endpoint/hostingPhpVersionSetEndpoint.js"
import { hostingPlanListEndpoint } from "../src/hosting/endpoint/hostingPlanListEndpoint.js"
import { hostingSearchVisibilitySetEndpoint } from "../src/hosting/endpoint/hostingSearchVisibilitySetEndpoint.js"
import { hostingSslReissueEndpoint } from "../src/hosting/endpoint/hostingSslReissueEndpoint.js"
import { hostingStagingCreateEndpoint } from "../src/hosting/endpoint/hostingStagingCreateEndpoint.js"
import { hostingStagingDeleteEndpoint } from "../src/hosting/endpoint/hostingStagingDeleteEndpoint.js"
import { hostingStagingEnvironmentSetEndpoint } from "../src/hosting/endpoint/hostingStagingEnvironmentSetEndpoint.js"
import { hostingStagingGateSetEndpoint } from "../src/hosting/endpoint/hostingStagingGateSetEndpoint.js"
import { hostingStagingGetEndpoint } from "../src/hosting/endpoint/hostingStagingGetEndpoint.js"
import { hostingStagingGuardSetEndpoint } from "../src/hosting/endpoint/hostingStagingGuardSetEndpoint.js"
import { hostingStagingPublishEndpoint } from "../src/hosting/endpoint/hostingStagingPublishEndpoint.js"
import { hostingStagingResetEndpoint } from "../src/hosting/endpoint/hostingStagingResetEndpoint.js"
import { hostingWordPressVersionSetEndpoint } from "../src/hosting/endpoint/hostingWordPressVersionSetEndpoint.js"
import { hostingWpCredentialCreateEndpoint } from "../src/hosting/endpoint/hostingWpCredentialCreateEndpoint.js"
import { hostingWpCredentialDeleteEndpoint } from "../src/hosting/endpoint/hostingWpCredentialDeleteEndpoint.js"
import { hostingWpCredentialListEndpoint } from "../src/hosting/endpoint/hostingWpCredentialListEndpoint.js"
import { porkbunE2eClientCreate } from "./porkbunE2eClientCreate.js"

const clientResult = porkbunE2eClientCreate()
if (!clientResult.success) throw new Error(clientResult.errorMessage)
const client = clientResult.data

test("mock hostingPlanList", async () => {
  const result = await hostingPlanList(client)
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingPlanListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingCreate", async () => {
  const result = await hostingCreate(client, {
    domain: "example.com",
    sku: "PIXIESECURESTATICM2",
    acknowledgedCost: 300,
    agreeToTerms: "yes",
  })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingGet", async () => {
  const result = await hostingGet(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingFileDeploy", async () => {
  const result = await hostingFileDeploy(client, {
    domain: "example.com",
    files: [{ path: "index.html", content: "aGk=" }],
  })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingFileDeployEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingFileList", async () => {
  const result = await hostingFileList(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingFileListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingFileDelete", async () => {
  const result = await hostingFileDelete(client, { domain: "example.com", path: "old/page.html" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingFileDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingDelete", async () => {
  const result = await hostingDelete(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingDirCreate", async () => {
  const result = await hostingDirCreate(client, { domain: "example.com", path: "assets/img" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingDirCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingWpCredentialCreate", async () => {
  const result = await hostingWpCredentialCreate(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(hostingWpCredentialCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingWpCredentialList", async () => {
  const result = await hostingWpCredentialList(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(hostingWpCredentialListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingWpCredentialDelete", async () => {
  const result = await hostingWpCredentialDelete(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(hostingWpCredentialDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingAutoRenewUpdate", async () => {
  const result = await hostingAutoRenewUpdate(client, { domain: "example.com", autoRenew: false })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingAutoRenewUpdateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingPhpVersionSet", async () => {
  const result = await hostingPhpVersionSet(client, { domain: "example.com", version: "8.3" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingPhpVersionSetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingWordPressVersionSet", async () => {
  const result = await hostingWordPressVersionSet(client, { domain: "example.com", version: "latest" })
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(hostingWordPressVersionSetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingSslReissue", async () => {
  const result = await hostingSslReissue(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingSslReissueEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingSearchVisibilitySet", async () => {
  const result = await hostingSearchVisibilitySet(client, { domain: "example.com", visible: true })
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(hostingSearchVisibilitySetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingBackupList", async () => {
  const result = await hostingBackupList(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingBackupListEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingBackupCreate", async () => {
  const result = await hostingBackupCreate(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingBackupCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingBackupDelete", async () => {
  const result = await hostingBackupDelete(client, { domain: "example.com", id: "test" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingBackupDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingBackupRestore", async () => {
  const result = await hostingBackupRestore(client, { domain: "example.com", fsId: "test", dbId: "test" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingBackupRestoreEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingGet", async () => {
  const result = await hostingStagingGet(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingStagingGetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingCreate", async () => {
  const result = await hostingStagingCreate(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingStagingCreateEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingReset", async () => {
  const result = await hostingStagingReset(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingStagingResetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingPublish", async () => {
  const result = await hostingStagingPublish(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingStagingPublishEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingDelete", async () => {
  const result = await hostingStagingDelete(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingStagingDeleteEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingGateSet", async () => {
  const result = await hostingStagingGateSet(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingStagingGateSetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingGuardSet", async () => {
  const result = await hostingStagingGuardSet(client, { domain: "example.com" })
  expect(result.success).toBe(true)
  if (result.success) expect(a.safeParse(hostingStagingGuardSetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
test("mock hostingStagingEnvironmentSet", async () => {
  const result = await hostingStagingEnvironmentSet(client, { domain: "example.com", type: "staging" })
  expect(result.success).toBe(true)
  if (result.success)
    expect(a.safeParse(hostingStagingEnvironmentSetEndpoint.responseSchema, result.data).success).toBe(true)
}, 35000)
