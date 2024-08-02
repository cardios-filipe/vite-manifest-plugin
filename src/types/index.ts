/**
 * Options for modifing manifest.
 */
export type ManifestOptions = {
  /** The file name of manifest file */
  fileName: string;
  /** The public path to be append in front of asset path*/
  publicPath?: string;
}