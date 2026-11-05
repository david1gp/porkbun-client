import { expect, test } from "bun:test"
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { hostingFileCollect } from "./hostingFileCollect.js"

test("collects directories recursively and maps individual remote paths", async () => {
  const dir = await mkdtemp(join(tmpdir(), "hosting-"))
  try {
    await mkdir(join(dir, "css"))
    await writeFile(join(dir, "css", "site.css"), "body{}")
    const result = await hostingFileCollect({ dir, file: [join(dir, "css", "site.css") + "=other.css"] })
    expect(result.success).toBe(true)
    if (result.success)
      expect(result.data).toEqual([
        { path: "css/site.css", content: "Ym9keXt9" },
        { path: "other.css", content: "Ym9keXt9" },
      ])
    expect((await hostingFileCollect({ file: [join(dir, "missing")] })).success).toBe(false)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test("skips hidden entries recursively unless explicitly included", async () => {
  const dir = await mkdtemp(join(tmpdir(), "hosting-hidden-"))
  try {
    await mkdir(join(dir, ".git"))
    await writeFile(join(dir, ".git", "config"), "secret")
    await writeFile(join(dir, ".hidden"), "hidden")
    await writeFile(join(dir, "index.html"), "ok")
    const normal = await hostingFileCollect({ dir })
    expect(normal.success && normal.data.map((file) => file.path)).toEqual(["index.html"])
    const all = await hostingFileCollect({ dir, includeHidden: true })
    expect(all.success && all.data.map((file) => file.path).sort()).toEqual([".git/config", ".hidden", "index.html"])
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
