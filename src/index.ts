import { Plugin } from "vite"
import { ManifestOptions } from "./types"
import { modifiedManifest } from "./utils"

interface ExtendedPlugin extends Plugin {
  modifiedManifest(options: ManifestOptions): Promise<void>
}

export const viteManifestPlugin = (options: ManifestOptions): ExtendedPlugin => {
  const plugin: ExtendedPlugin = {
    name: 'vite-manifest-plugin',
    modifiedManifest: modifiedManifest
  }

  modifiedManifest(options)

  return plugin;
}