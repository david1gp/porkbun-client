import { buildRouteMap } from "@stricli/core"
import { sslBundleGetCommand } from "./sslBundleGetCommand.js"

export const sslCommand = buildRouteMap({
  routes: { bundleGet: sslBundleGetCommand },
  docs: { brief: "Manage SSL certificates" },
})
