import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    assetsInclude: ['**/*.glb'],
    server: {
        allowedHosts: true
    }
});
