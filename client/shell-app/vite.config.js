import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const APP_NAME = "shellApp";
const PORT = 3000;

function remoteEntryURL(port) {
  return `http://localhost:${port}/assets/remoteEntry.js`;
}

function remoteEntryURLFromRender(url) {
  return `${url}/assets/remoteEntry.js`;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: APP_NAME,
      remotes: {
        authApp: remoteEntryURLFromRender("https://neighborly-auth.onrender.com"),
        businessApp: remoteEntryURLFromRender("https://neighborly-business.onrender.com"),
        commentApp: remoteEntryURLFromRender("https://neighborly-comment.onrender.com"),
        eventApp: remoteEntryURLFromRender("https://neighborly-event.onrender.com"),
        residentApp: remoteEntryURLFromRender("https://neighborly-resident.onrender.com"),
        aiApp: remoteEntryURLFromRender("https://neighborly-ai.onrender.com"),
      },
      shared: ["react", "react-dom", "react-router-dom", "@apollo/client", "react-bootstrap"],
    }),
    {
      name: "custom-logger",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          console.log(`\n🚀 shell-app → http://localhost:${PORT}\n`);
        });
      },
    },
  ],
  server: {
    port: PORT,
    proxy: {
      "/api": {
        target: "https://neighborly-app-api.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    target: "esnext",
  }
});
