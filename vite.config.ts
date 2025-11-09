import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import path from "path";
import { setupAuthMiddleware } from "./src/server";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tanstackRouter(),
    {
      name: "better-auth",
      configureServer(server) {
        console.log("[Vite] Configuring Better-Auth middleware...");
        setupAuthMiddleware(server);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
    },
  },
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
    include: ["buffer"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
