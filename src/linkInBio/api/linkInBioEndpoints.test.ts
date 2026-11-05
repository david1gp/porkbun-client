import { expect, test } from "bun:test"
import * as a from "valibot"
import type { PorkbunEndpoint } from "../../shared/PorkbunEndpoint.js"
import { porkbunEndpointCall } from "../../shared/porkbunEndpointCall.js"
import { porkbunTestClient } from "../../shared/porkbunTestClient.test.js"
import { linkInBioAppearanceUpdateEndpoint } from "../endpoint/linkInBioAppearanceUpdateEndpoint.js"
import { linkInBioCreateEndpoint } from "../endpoint/linkInBioCreateEndpoint.js"
import { linkInBioGetEndpoint } from "../endpoint/linkInBioGetEndpoint.js"
import { linkInBioLinkCreateEndpoint } from "../endpoint/linkInBioLinkCreateEndpoint.js"
import { linkInBioLinkDeleteEndpoint } from "../endpoint/linkInBioLinkDeleteEndpoint.js"
import { linkInBioLinkEditEndpoint } from "../endpoint/linkInBioLinkEditEndpoint.js"
import { linkInBioLinkReorderEndpoint } from "../endpoint/linkInBioLinkReorderEndpoint.js"
import { linkInBioProfileUpdateEndpoint } from "../endpoint/linkInBioProfileUpdateEndpoint.js"
import { linkInBioSettingsUpdateEndpoint } from "../endpoint/linkInBioSettingsUpdateEndpoint.js"
import { linkInBioSocialsUpdateEndpoint } from "../endpoint/linkInBioSocialsUpdateEndpoint.js"

const specResponse1 = {
  status: "SUCCESS",
  linkInBio: {
    domain: "example.com",
    url: "https://example.com",
    delivery: "domain",
    plan: {
      sku: "sample",
      name: "sample",
      free: true,
      price: 1,
      interval: "sample",
    },
    status: "ACTIVE",
    isTrial: true,
    expireDate: "sample",
    features: {
      maxLinks: 1,
      scheduling: true,
      animation: true,
      passcodeProtection: true,
      analyticsIds: true,
      utmParameters: true,
      mailingList: true,
    },
    linkCount: 1,
    profile: {
      title: "sample",
      bio: "sample",
      avatarUrl: "sample",
    },
    links: [
      {
        id: 1292105,
        type: "link",
        title: "Shop my store",
        url: "https://example.com/shop",
        enabled: true,
        position: 1,
        startDate: "sample",
        endDate: "sample",
        animation: "pulse",
        protection: {
          type: "code",
          value: "sample",
          explanation: "sample",
        },
        imageUrl: "sample",
      },
    ],
    socials: {
      location: "top",
      email: "sample",
      instagram: "sample",
      facebook: "sample",
      tiktok: "sample",
      youtube: "sample",
      twitter: "sample",
      linkedin: "sample",
    },
    appearance: {
      preset: "sample",
      fontFamily: "sample",
      buttonStyle: "sample",
      radius: 1,
      pageBackgroundMode: "sample",
      textAlign: "sample",
      pageBackgroundColor: "sample",
      pageBackgroundColor2: "sample",
      pageColor: "sample",
      boxBackgroundColor: "sample",
      borderColor: "sample",
    },
    settings: {
      sensitiveContent: "sample",
      analytics: {
        googleAnalyticsId: "sample",
        facebookPixelId: "sample",
        twitterPixelId: "sample",
        tikTokPixelId: "sample",
        utmSource: "sample",
        utmMedium: "sample",
      },
      mailingList: {
        enabled: true,
        provider: "sample",
      },
    },
    editorUrl: "sample",
  },
} as const

const specResponse2 = {
  status: "SUCCESS",
  link: {
    id: 1292105,
    type: "link",
    title: "Shop my store",
    url: "https://example.com/shop",
    enabled: true,
    position: 1,
    startDate: "sample",
    endDate: "sample",
    animation: "pulse",
    protection: {
      type: "code",
      value: "sample",
      explanation: "sample",
    },
    imageUrl: "sample",
  },
  linkInBio: {
    domain: "example.com",
    url: "https://example.com",
    delivery: "domain",
    plan: {
      sku: "sample",
      name: "sample",
      free: true,
      price: 1,
      interval: "sample",
    },
    status: "ACTIVE",
    isTrial: true,
    expireDate: "sample",
    features: {
      maxLinks: 1,
      scheduling: true,
      animation: true,
      passcodeProtection: true,
      analyticsIds: true,
      utmParameters: true,
      mailingList: true,
    },
    linkCount: 1,
    profile: {
      title: "sample",
      bio: "sample",
      avatarUrl: "sample",
    },
    links: [
      {
        id: 1292105,
        type: "link",
        title: "Shop my store",
        url: "https://example.com/shop",
        enabled: true,
        position: 1,
        startDate: "sample",
        endDate: "sample",
        animation: "pulse",
        protection: {
          type: "code",
          value: "sample",
          explanation: "sample",
        },
        imageUrl: "sample",
      },
    ],
    socials: {
      location: "top",
      email: "sample",
      instagram: "sample",
      facebook: "sample",
      tiktok: "sample",
      youtube: "sample",
      twitter: "sample",
      linkedin: "sample",
    },
    appearance: {
      preset: "sample",
      fontFamily: "sample",
      buttonStyle: "sample",
      radius: 1,
      pageBackgroundMode: "sample",
      textAlign: "sample",
      pageBackgroundColor: "sample",
      pageBackgroundColor2: "sample",
      pageColor: "sample",
      boxBackgroundColor: "sample",
      borderColor: "sample",
    },
    settings: {
      sensitiveContent: "sample",
      analytics: {
        googleAnalyticsId: "sample",
        facebookPixelId: "sample",
        twitterPixelId: "sample",
        tikTokPixelId: "sample",
        utmSource: "sample",
        utmMedium: "sample",
      },
      mailingList: {
        enabled: true,
        provider: "sample",
      },
    },
    editorUrl: "sample",
  },
} as const

// Static fixtures resolved from OpenAPI request properties and response property
// examples (with typed placeholders for fields without examples). Cloudflare's
// unspecified response objects intentionally produce {} here, as does its mock.
const cases = [
  {
    endpoint: linkInBioAppearanceUpdateEndpoint,
    input: {
      preset: "classic",
      fontFamily: "inter",
      buttonStyle: "classic",
      radius: 1,
      pageBackgroundMode: "solid",
      textAlign: "left",
      pageBackgroundColor: "sample",
      pageBackgroundColor2: "sample",
      pageColor: "sample",
      boxBackgroundColor: "sample",
      borderColor: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/updateAppearance/example.com",
    body: {
      preset: "classic",
      fontFamily: "inter",
      buttonStyle: "classic",
      radius: 1,
      pageBackgroundMode: "solid",
      textAlign: "left",
      pageBackgroundColor: "sample",
      pageBackgroundColor2: "sample",
      pageColor: "sample",
      boxBackgroundColor: "sample",
      borderColor: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
  },
  {
    endpoint: linkInBioCreateEndpoint,
    input: {
      agreeToNameserverChange: true,
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/create/example.com",
    body: {
      agreeToNameserverChange: true,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
  },
  {
    endpoint: linkInBioGetEndpoint,
    input: {
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/get/example.com",
    body: {
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
  },
  {
    endpoint: linkInBioLinkCreateEndpoint,
    input: {
      type: "link",
      title: "Shop my store",
      url: "https://example.com/shop",
      enabled: true,
      startDate: "sample",
      endDate: "sample",
      animation: "pulse",
      protection: {
        type: "code",
        value: "sample",
        explanation: "sample",
      },
      position: "bottom",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/addLink/example.com",
    body: {
      type: "link",
      title: "Shop my store",
      url: "https://example.com/shop",
      enabled: true,
      startDate: "sample",
      endDate: "sample",
      animation: "pulse",
      protection: {
        type: "code",
        value: "sample",
        explanation: "sample",
      },
      position: "bottom",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse2,
  },
  {
    endpoint: linkInBioLinkDeleteEndpoint,
    input: {
      id: 1,
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/deleteLink/example.com",
    body: {
      id: 1,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
  },
  {
    endpoint: linkInBioLinkEditEndpoint,
    input: {
      type: "link",
      title: "Shop my store",
      url: "https://example.com/shop",
      enabled: true,
      startDate: "sample",
      endDate: "sample",
      animation: "pulse",
      protection: {
        type: "code",
        value: "sample",
        explanation: "sample",
      },
      id: 1,
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/editLink/example.com",
    body: {
      type: "link",
      title: "Shop my store",
      url: "https://example.com/shop",
      enabled: true,
      startDate: "sample",
      endDate: "sample",
      animation: "pulse",
      protection: {
        type: "code",
        value: "sample",
        explanation: "sample",
      },
      id: 1,
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse2,
  },
  {
    endpoint: linkInBioLinkReorderEndpoint,
    input: {
      ids: [1],
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/reorderLinks/example.com",
    body: {
      ids: [1],
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
  },
  {
    endpoint: linkInBioProfileUpdateEndpoint,
    input: {
      title: "Jane Baker",
      bio: "sample",
      avatar: "sample",
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/updateProfile/example.com",
    body: {
      title: "Jane Baker",
      bio: "sample",
      avatar: "sample",
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
  },
  {
    endpoint: linkInBioSettingsUpdateEndpoint,
    input: {
      sensitiveContent: "generic",
      analytics: {
        googleAnalyticsId: "G-ABC123",
      },
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/updateSettings/example.com",
    body: {
      sensitiveContent: "generic",
      analytics: {
        googleAnalyticsId: "G-ABC123",
      },
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
  },
  {
    endpoint: linkInBioSocialsUpdateEndpoint,
    input: {
      location: "top",
      socials: {
        instagram: "janebakes",
        email: "jane@example.com",
      },
      dryRun: true,
      domain: "example.com",
    },
    method: "POST",
    url: "https://api.porkbun.com/api/json/v3/linkinbio/updateSocials/example.com",
    body: {
      location: "top",
      socials: {
        instagram: "janebakes",
        email: "jane@example.com",
      },
      dryRun: true,
      apikey: "pk1_test",
      secretapikey: "sk1_test",
    },
    response: specResponse1,
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
