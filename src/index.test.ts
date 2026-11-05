import { expect, test } from "bun:test"
import * as publicApi from "./index.js"

test("the public barrel exposes every registered endpoint and its callable library operation", () => {
  const exports = new Map(Object.entries(publicApi))
  for (const endpoint of publicApi.porkbunEndpointList) {
    expect(exports.get(`${endpoint.op}Endpoint`)).toBe(endpoint)
    expect(typeof exports.get(endpoint.op)).toBe("function")
  }
  const exportedEndpoints = [...exports.keys()].filter((name) => name.endsWith("Endpoint"))
  expect(exportedEndpoints.length).toBe(publicApi.porkbunEndpointList.length)
})
