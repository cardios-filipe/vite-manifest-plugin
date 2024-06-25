import { describe, it, expect, vi, beforeEach } from 'vitest';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { modifiedManifest } from './utils';
import { ManifestOptions } from './types';

// Mocking the fs and path modules
vi.mock('fs', () => ({
    writeFileSync: vi.fn(),
}));
vi.mock('path', () => ({
    resolve: vi.fn((...args) => args.join('/')),
}));
vi.mock('fs/promises', () => ({
    readFile: vi.fn(),
}));

describe('modifiedManifest', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should modify the manifest file correctly', async () => {
        const mockManifest = {
            "main.js": { "file": "main.js" },
            "vendor.js": { "file": "vendor.js" }
        };
        const options: ManifestOptions = {
            fileName: 'manifest.json',
            publicPath: '/static/'
        };

        (readFile as any).mockResolvedValue(JSON.stringify(mockManifest));

        await modifiedManifest('output', options);

        expect(readFile).toHaveBeenCalledWith('output/manifest.json', 'utf-8');
        expect(writeFileSync).toHaveBeenCalledWith(
            'output/manifest.json',
            JSON.stringify({
                "main.js": { "file": "/static/main.js" },
                "vendor.js": { "file": "/static/vendor.js" }
            }, null, 2)
        );
    });

    it('should handle absence of outputPath and publicPath', async () => {
        const mockManifest = {
            "main.js": { "file": "main.js" },
            "vendor.js": { "file": "vendor.js" }
        };
        const options: ManifestOptions = {
            fileName: 'manifest.json'
        };

        (readFile as any).mockResolvedValue(JSON.stringify(mockManifest));

        await modifiedManifest(undefined, options);

        expect(readFile).toHaveBeenCalledWith('/manifest.json', 'utf-8');
        expect(writeFileSync).toHaveBeenCalledWith(
            '/manifest.json',
            JSON.stringify({
                "main.js": { "file": "/main.js" },
                "vendor.js": { "file": "/vendor.js" }
            }, null, 2)
        );
    });

    it('should handle errors when file is not found', async () => {
        const options: ManifestOptions = {
            fileName: 'manifest.json'
        };

        (readFile as any).mockRejectedValue(new Error('File not found'));

        await modifiedManifest('output', options);

        expect(readFile).toHaveBeenCalledWith('output/manifest.json', 'utf-8');
        expect(writeFileSync).not.toHaveBeenCalled();
    });

    it('should handle when outputPath is not found', async () => {
        const options: ManifestOptions = {
            fileName: 'manifest.json'
        };

        (resolve as any).mockImplementation(() => {
            throw new Error('Output path not found');
        });

        await modifiedManifest('invalidPath', options);
        expect(resolve).toHaveBeenCalledWith('invalidPath/manifest.json');
        expect(resolve).toHaveBeenCalledWith('invalidPath/manifest.json');
        expect(readFile).not.toHaveBeenCalled();
        expect(writeFileSync).not.toHaveBeenCalled();
    });
});
