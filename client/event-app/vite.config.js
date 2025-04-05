import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const APP_NAME = "eventApp";
const PORT = 3004;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: APP_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./TestAllComponents": "./src/App",
      },
      shared: ["react", "react-dom", "react-router-dom", "@apollo/client"],
    }),
    {
      name: "custom-logger",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          console.log(`\n🚀 event-app → http://localhost:${PORT}\n`);
        });
      },
    },
  ],
  server: {
    port: PORT,
  },
  preview: {
    port: PORT,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
