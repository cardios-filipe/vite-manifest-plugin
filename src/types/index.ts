/**
 * Options for modifing manifest.
 */
export type ManifestOptions = {
  /** The file name of manifest file */
  manifestPath: string;
  /** The public path to be append in front of asset path*/
  publicPath?: string;
}