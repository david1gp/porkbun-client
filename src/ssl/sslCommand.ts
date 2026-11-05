import { buildRouteMap } from "@stricli/core"
import { sslBundleGetCommand } from "./sslBundleGetCommand.js"

export const sslCommand = buildRouteMap({
  routes: {
    bundle: buildRouteMap({ routes: { get: sslBundleGetCommand }, docs: { brief: "Manage certificate bundles" } }),
  },
  docs: { brief: "Manage SSL certificates" },
})
