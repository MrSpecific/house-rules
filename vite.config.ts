import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { setupAuthMiddleware } from "./src/devServer";

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsconfigPaths(),
    tanstackStart(), // must come before React
    react(),
    // {
    //   name: "better-auth",
    //   configureServer(server) {
    //     console.log("[Vite] Configuring Better-Auth middleware...");
    //     setupAuthMiddleware(server);
    //   },
    // },
  ],
  define: {
    global: "globalThis",
  },
  // Keep any special build flags you rely on. This one is harmless/safe.
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
