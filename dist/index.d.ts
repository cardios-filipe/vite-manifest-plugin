import { Plugin } from 'vite';

/**
 * Options for modifing manifest.
 */
type ManifestOptions = {
    /** The file name of manifest file */
    fileName: string;
    /** The public path to be append in front of asset path*/
    publicPath?: string;
};

declare const viteManifestPlugin: (options: ManifestOptions) => Promise<Plugin<any>>;

export { viteManifestPlugin };
