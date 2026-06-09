import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import path from "path";

const logger = createLogger();
const originalWarn = logger.warn;
const originalWarnOnce = logger.warnOnce;
const originalError = logger.error;

logger.warn = (msg, options) => {
  if (msg.includes("Failed to load source map")) return;
  originalWarn(msg, options);
};

logger.warnOnce = (msg, options) => {
  if (msg.includes("Failed to load source map")) return;
  originalWarnOnce(msg, options);
};

logger.error = (msg, options) => {
  if (msg.includes("Failed to load source map")) return;
  originalError(msg, options);
};

export default defineConfig({
  customLogger: logger,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: true,
  },
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    nitro(),
    react(),
  ],
});
