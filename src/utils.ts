import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

import { ManifestOptions } from "./types";

export const modifiedManifest = async (outputPath: string | undefined, options: ManifestOptions): Promise<void> => {
  const manifestPath = resolve(`${outputPath ?? ""}/${options.fileName}`);
  const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));

  for (const key in manifest) {
    if (Object.prototype.hasOwnProperty.call(manifest, key)) {
      manifest[key].file = `${options.publicPath ?? "/"}${manifest[key].file}`;
    }
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}