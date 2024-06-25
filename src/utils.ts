import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

import { ManifestOptions } from "./types";

export const modifiedManifest = async (options: ManifestOptions): Promise<void> => {
  const manifestPath = resolve(options.manifestPath);
  const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));

  const modifiedManifest = manifest

  console.log("modifing manifest")

  for (const key in manifest) {
    if (Object.prototype.hasOwnProperty.call(manifest, key)) {
      console.log(`modifying ${key}`)
      manifest[key].file = `${options.publicPath ?? "/"}${manifest[key].file}`;
      // modifiedManifest[key]["file"] = `${options.publicPath ?? "/"}${manifest[key].file}`;
    }
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log("done manifest")
}