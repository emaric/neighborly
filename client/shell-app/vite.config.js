import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const APP_NAME = "shellApp";
const PORT = 3000;

function remoteEntryURL(port) {
  return `http://localhost:${port}/assets/remoteEntry.js`;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: APP_NAME,
      remotes: {
        authApp: remoteEntryURL(3001),
        businessApp: remoteEntryURL(3002),
        commentApp: remoteEntryURL(3003),
        eventApp: remoteEntryURL(3004),
        residentApp: remoteEntryURL(3005),
        aiApp: remoteEntryURL(3006),
      },
      shared: ["react", "react-dom", "@apollo/client"],
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
  },
});
