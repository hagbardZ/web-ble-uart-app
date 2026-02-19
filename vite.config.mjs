import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
    define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_GIT_REPO_PATH__: JSON.stringify("https://github.com/SiliconLabsSoftware/web-bluetooth-spp-application"),
    __APP_SPP_BLE_SERVICE__: JSON.stringify("49535343-fe7d-4ae5-8fa9-9fafd205e455"),
    __APP_SPP_BLE_CHARACTERISTIC__: JSON.stringify("49535343-1e4d-4bd9-ba61-23c647249616"),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  base: "/web-bluetooth-spp-application/"
});
