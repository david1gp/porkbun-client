import { expect, test } from "bun:test"
import * as a from "valibot"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { hostingAutoRenewUpdateEndpoint } from "../endpoint/hostingAutoRenewUpdateEndpoint.js"
import { hostingBackupCreateEndpoint } from "../endpoint/hostingBackupCreateEndpoint.js"
import { hostingBackupDeleteEndpoint } from "../endpoint/hostingBackupDeleteEndpoint.js"
import { hostingBackupListEndpoint } from "../endpoint/hostingBackupListEndpoint.js"
import { hostingBackupRestoreEndpoint } from "../endpoint/hostingBackupRestoreEndpoint.js"
import { hostingCreateEndpoint } from "../endpoint/hostingCreateEndpoint.js"
import { hostingDeleteEndpoint } from "../endpoint/hostingDeleteEndpoint.js"
import { hostingDirCreateEndpoint } from "../endpoint/hostingDirCreateEndpoint.js"
import { hostingFileDeleteEndpoint } from "../endpoint/hostingFileDeleteEndpoint.js"
import { hostingFileDeployEndpoint } from "../endpoint/hostingFileDeployEndpoint.js"
import { hostingFileListEndpoint } from "../endpoint/hostingFileListEndpoint.js"
import { hostingGetEndpoint } from "../endpoint/hostingGetEndpoint.js"
import { hostingPhpVersionSetEndpoint } from "../endpoint/hostingPhpVersionSetEndpoint.js"
import { hostingPlanListEndpoint } from "../endpoint/hostingPlanListEndpoint.js"
import { hostingSearchVisibilitySetEndpoint } from "../endpoint/hostingSearchVisibilitySetEndpoint.js"
import { hostingSslReissueEndpoint } from "../endpoint/hostingSslReissueEndpoint.js"
import { hostingStagingCreateEndpoint } from "../endpoint/hostingStagingCreateEndpoint.js"
import { hostingStagingDeleteEndpoint } from "../endpoint/hostingStagingDeleteEndpoint.js"
import { hostingStagingEnvironmentSetEndpoint } from "../endpoint/hostingStagingEnvironmentSetEndpoint.js"
import { hostingStagingGateSetEndpoint } from "../endpoint/hostingStagingGateSetEndpoint.js"
import { hostingStagingGetEndpoint } from "../endpoint/hostingStagingGetEndpoint.js"
import { hostingStagingGuardSetEndpoint } from "../endpoint/hostingStagingGuardSetEndpoint.js"
import { hostingStagingPublishEndpoint } from "../endpoint/hostingStagingPublishEndpoint.js"
import { hostingStagingResetEndpoint } from "../endpoint/hostingStagingResetEndpoint.js"
import { hostingWordPressVersionSetEndpoint } from "../endpoint/hostingWordPressVersionSetEndpoint.js"
import { hostingWpCredentialCreateEndpoint } from "../endpoint/hostingWpCredentialCreateEndpoint.js"
import { hostingWpCredentialDeleteEndpoint } from "../endpoint/hostingWpCredentialDeleteEndpoint.js"
import { hostingWpCredentialListEndpoint } from "../endpoint/hostingWpCredentialListEndpoint.js"

// Static fixtures resolved from OpenAPI request properties and response property
// examples (with typed placeholders for fields without examples). Cloudflare's
// unspecified response objects intentionally produce {} here, as does its mock.
const cases = [
  {
    endpoint: hostingAutoRenewUpdateEndpoint,
    input: {
      autoRenew: false,
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/updateAutoRenew/example.com",
    body: {
      autoRenew: false,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      product: "managedLinks",
      autoRenew: true,
      isTrial: true,
      expireDate: "sample",
      cost: {
        amount: 1,
        formatted: "sample",
        interval: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingBackupCreateEndpoint,
    input: {
      staging: true,
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/createBackup/example.com",
    body: {
      staging: true,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      message: "sample",
    },
  },
  {
    endpoint: hostingBackupDeleteEndpoint,
    input: {
      staging: true,
      id: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/deleteBackup/example.com",
    body: {
      staging: true,
      id: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      message: "sample",
    },
  },
  {
    endpoint: hostingBackupListEndpoint,
    input: {
      staging: true,
      limit: 1,
      type: "files",
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/backups/example.com",
    body: {
      staging: true,
      limit: 1,
      type: "files",
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      target: "live",
      backups: [
        {
          id: "sample",
          type: "files",
          onDemand: true,
          createdAt: "sample",
          bytes: 1,
        },
      ],
      count: 1,
      total: 1,
      retention: "sample",
      message: "sample",
    },
  },
  {
    endpoint: hostingBackupRestoreEndpoint,
    input: {
      staging: true,
      fsId: "sample",
      dbId: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/restoreBackup/example.com",
    body: {
      staging: true,
      fsId: "sample",
      dbId: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      target: "sample",
      operation: {
        id: 1,
        type: "sample",
        state: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingCreateEndpoint,
    input: {
      sku: "PIXIESECURESTATICM2",
      acknowledgedCost: 1,
      agreeToTerms: "yes",
      agreeToNameserverChange: true,
      payWith: "usdc",
      usdcCheckoutId: "sample",
      cardPaymentId: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/create/example.com",
    body: {
      sku: "PIXIESECURESTATICM2",
      acknowledgedCost: 1,
      agreeToTerms: "yes",
      agreeToNameserverChange: true,
      payWith: "usdc",
      usdcCheckoutId: "sample",
      cardPaymentId: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      orderId: 1,
      hosting: {
        domain: "example.com",
        product: "sample",
        plan: "sample",
        server: "sample",
        status: "ACTIVE",
        trial: true,
        trialEndsAt: "sample",
        autoRenew: true,
        sku: "sample",
      },
      charged: 1,
      cost: {
        amount: 1,
        formatted: "sample",
        interval: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingDeleteEndpoint,
    input: {
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/delete/example.com",
    body: {
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      warnings: [
        "example.com is delegated to nameservers we do not operate (ns1.example-dns.net), so this change was saved to your Porkbun DNS zone but does NOT affect what resolves. Make the same change wherever those nameservers are managed, or point the domain back at ours (maceio.ns.porkbun.com, curitiba.ns.porkbun.com, salvador.ns.porkbun.com, fortaleza.ns.porkbun.com) with POST /domain/updateNs/example.com -- the zone you just edited is what we would start serving.",
      ],
      status: "SUCCESS",
      message: "sample",
      code: "sample",
    },
  },
  {
    endpoint: hostingDirCreateEndpoint,
    input: {
      path: "assets/img",
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/makeDir/example.com",
    body: {
      path: "assets/img",
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      created: "sample",
    },
  },
  {
    endpoint: hostingFileDeleteEndpoint,
    input: {
      path: "old/page.html",
      recursive: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/deleteFile/example.com",
    body: {
      path: "old/page.html",
      recursive: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      deleted: "sample",
    },
  },
  {
    endpoint: hostingFileDeployEndpoint,
    input: {
      files: [
        {
          path: "index.html",
          content: "aGk=",
        },
      ],
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/deploy/example.com",
    body: {
      files: [
        {
          path: "index.html",
          content: "aGk=",
        },
      ],
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      deployed: ["sample"],
      skipped: [
        {
          path: "sample",
          reason: "sample",
        },
      ],
    },
  },
  {
    endpoint: hostingFileListEndpoint,
    input: {
      domain: "example.com",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/hosting/files/example.com",
    body: undefined,
    response: {
      status: "SUCCESS",
      path: "sample",
      files: ["sample"],
    },
  },
  {
    endpoint: hostingGetEndpoint,
    input: {
      domain: "example.com",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/hosting/get/example.com",
    body: undefined,
    response: {
      status: "SUCCESS",
      hosting: {
        domain: "example.com",
        product: "sample",
        status: "sample",
        plan: "sample",
        server: "sample",
        isTrial: true,
        autoRenew: true,
        expireDate: "sample",
        pendingRetire: true,
        cost: {},
        wordpress: {
          restUrl: "sample",
          adminUrl: "sample",
          site: {
            siteId: 1,
            phpVersion: "8.4",
            availablePhpVersions: ["8.2", "8.3", "8.4", "8.5"],
            wordPressVersion: "latest",
            ssl: {
              issued: true,
              expiresAt: "sample",
            },
            storage: {
              usedBytes: 1,
              quotaBytes: 1,
              percentUsed: 1,
              note: "sample",
            },
            searchVisibility: {
              visible: true,
              checkedAt: "sample",
            },
            staging: {
              url: "sample",
              status: "sample",
              operation: "sample",
              operationState: "sample",
            },
            operations: [
              {
                id: 1,
                type: "restore",
                target: "sample",
                state: "queued",
                createdAt: "sample",
                updatedAt: "sample",
                error: "sample",
              },
            ],
          },
        },
      },
    },
  },
  {
    endpoint: hostingPhpVersionSetEndpoint,
    input: {
      version: "8.3",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/setPhpVersion/example.com",
    body: {
      version: "8.3",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      message: "sample",
    },
  },
  {
    endpoint: hostingPlanListEndpoint,
    input: {},
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/hosting/plans",
    body: undefined,
    response: {
      status: "SUCCESS",
      plans: [
        {
          product: "secureStaticHosting",
          plan: "monthly",
          sku: "sample",
          interval: "sample",
          price: 1,
          priceFormatted: "sample",
          trialDays: 1,
          name: "sample",
          features: {},
        },
      ],
    },
  },
  {
    endpoint: hostingSearchVisibilitySetEndpoint,
    input: {
      visible: true,
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/setSearchVisibility/example.com",
    body: {
      visible: true,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      message: "sample",
    },
  },
  {
    endpoint: hostingSslReissueEndpoint,
    input: {
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/reissueSsl/example.com",
    body: {
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      message: "sample",
    },
  },
  {
    endpoint: hostingStagingCreateEndpoint,
    input: {
      fsId: "sample",
      dbId: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/createStaging/example.com",
    body: {
      fsId: "sample",
      dbId: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      staging: {
        url: "https://example-ab12cd34.stagebun.com",
        status: "sample",
        operation: "sample",
        operationState: "sample",
        builtFromBackup: {
          files: "sample",
          database: "sample",
        },
        passwordProtection: {
          enabled: true,
          password: "test-password",
        },
        outbound: {
          guardInstalled: true,
          blockEmail: true,
          blockApiRequests: true,
        },
        environment: "sample",
        ssl: {
          issued: true,
        },
        createdAt: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingStagingDeleteEndpoint,
    input: {
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/deleteStaging/example.com",
    body: {
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      operation: {
        type: "sample",
        state: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingStagingEnvironmentSetEndpoint,
    input: {
      type: "staging",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/setStagingEnvironment/example.com",
    body: {
      type: "staging",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      operation: {
        type: "sample",
        state: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingStagingGateSetEndpoint,
    input: {
      enabled: true,
      password: "test-password",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/setStagingGate/example.com",
    body: {
      enabled: true,
      password: "test-password",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      passwordProtection: {
        enabled: true,
        password: "test-password",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingStagingGetEndpoint,
    input: {
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/getStaging/example.com",
    body: {
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      staging: {
        url: "https://example-ab12cd34.stagebun.com",
        status: "sample",
        operation: "sample",
        operationState: "sample",
        builtFromBackup: {
          files: "sample",
          database: "sample",
        },
        passwordProtection: {
          enabled: true,
          password: "test-password",
        },
        outbound: {
          guardInstalled: true,
          blockEmail: true,
          blockApiRequests: true,
        },
        environment: "sample",
        ssl: {
          issued: true,
        },
        createdAt: "sample",
      },
    },
  },
  {
    endpoint: hostingStagingGuardSetEndpoint,
    input: {
      blockEmail: true,
      blockApiRequests: true,
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/setStagingGuard/example.com",
    body: {
      blockEmail: true,
      blockApiRequests: true,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      operation: {
        type: "sample",
        state: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingStagingPublishEndpoint,
    input: {
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/publishStaging/example.com",
    body: {
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      operation: {
        type: "sample",
        state: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingStagingResetEndpoint,
    input: {
      fsId: "sample",
      dbId: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/resetStaging/example.com",
    body: {
      fsId: "sample",
      dbId: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      operation: {
        type: "sample",
        state: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingWordPressVersionSetEndpoint,
    input: {
      version: "latest",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/setWordPressVersion/example.com",
    body: {
      version: "latest",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      domain: "example.com",
      message: "sample",
    },
  },
  {
    endpoint: hostingWpCredentialCreateEndpoint,
    input: {
      role: "editor",
      acknowledgeFullAccess: true,
      name: "Acme-Agent",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/createWpCredentials/example.com",
    body: {
      role: "editor",
      acknowledgeFullAccess: true,
      name: "Acme-Agent",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      credentials: {
        username: "porkbun-agent",
        applicationPassword: "abcd EFGH ijkl MNOP qrst UVWX",
        role: "editor",
        name: "Porkbun-API",
        restUrl: "https://example.com/wp-json/",
        authorization: "sample",
      },
      message: "sample",
    },
  },
  {
    endpoint: hostingWpCredentialDeleteEndpoint,
    input: {
      uuid: "sample",
      all: true,
      wpUser: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/hosting/deleteWpCredentials/example.com",
    body: {
      uuid: "sample",
      all: true,
      wpUser: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: {
      status: "SUCCESS",
      revoked: "sample",
      message: "sample",
    },
  },
  {
    endpoint: hostingWpCredentialListEndpoint,
    input: {
      domain: "example.com",
      wpUser: "sample",
    },
    method: "GET",
    url: "https://api.porkbun.com/api/json/v3/hosting/getWpCredentials/example.com?wpUser=sample",
    body: undefined,
    response: {
      status: "SUCCESS",
      wpUser: "sample",
      credentials: [{}],
    },
  },
] as const

for (const row of cases) {
  test(`${row.endpoint.op} serializes the entire payload and parses the spec example shape`, async () => {
    const endpoint: PorkbunEndpoint = row.endpoint
    const { client, calls } = porkbunTestClient(row.response)
    const result = await porkbunEndpointCall(client, endpoint, row.input)
    expect(result.success).toBe(true)
    expect(calls).toHaveLength(1)
    expect(calls[0]!.url).toBe(row.url)
    expect(calls[0]!.init?.method).toBe(row.method)
    expect(calls[0]!.body).toEqual(row.body)
    if (endpoint.method === "GET") {
      expect(calls[0]!.init?.body).toBeUndefined()
      expect(calls[0]!.headers.get("x-api-key")).toBe("pk1_test")
      expect(calls[0]!.headers.get("x-secret-api-key")).toBe("sk1_test")
    }
    expect(a.safeParse(endpoint.responseSchema, row.response).success).toBe(true)
  })
}
