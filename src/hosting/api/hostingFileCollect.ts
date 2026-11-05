import { readdir, readFile } from "node:fs/promises"
import { basename, join, relative, sep } from "node:path"
import { createResult, createResultError, type PromiseResult } from "#result"

type FileEntry = { path?: string; content?: string }

/** Collect local files without following directory symlinks. */
export async function hostingFileCollect(input: {
  dir?: string
  file?: readonly string[]
  files?: FileEntry[]
  includeHidden?: boolean
}): PromiseResult<FileEntry[]> {
  const op = "hostingFileCollect"
  const files: FileEntry[] = [...(input.files ?? [])]
  try {
    async function walk(root: string, directory: string): Promise<void> {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        if (!input.includeHidden && entry.name.startsWith(".")) continue
        const path = join(directory, entry.name)
        if (entry.isDirectory()) await walk(root, path)
        else if (entry.isFile())
          files.push({
            path: relative(root, path).split(sep).join("/"),
            content: (await readFile(path)).toString("base64"),
          })
      }
    }
    if (input.dir) await walk(input.dir, input.dir)
    // Hidden-name filtering applies only to implicit directory discovery. An
    // explicit --file path (including .hidden or .git/config) is intentional
    // and is uploaded without requiring --include-hidden; raw --files is too.
    for (const item of input.file ?? []) {
      const index = item.indexOf("=")
      const local = index < 0 ? item : item.slice(0, index)
      const remote = index < 0 ? basename(local) : item.slice(index + 1)
      if (!local || !remote) return createResultError(op, "A local and remote path are required")
      files.push({ path: remote, content: (await readFile(local)).toString("base64") })
    }
  } catch (error) {
    return createResultError(
      op,
      "Unable to collect local files",
      error instanceof Error ? error.message : String(error),
    )
  }
  if (!files.length) return createResultError(op, "Provide --dir, --file or --files")
  return createResult(files)
}
