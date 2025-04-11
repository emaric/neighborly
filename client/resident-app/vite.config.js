import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const APP_NAME = "residentApp";
const PORT = 3005;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: APP_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./TestAllComponents": "./src/App",
        "./PostListComponent": "./src/components/PostListComponent",
        "./PostComponent": "./src/components/PostComponent",
        "./PostRoute": "./src/routes/PostRoute",
        "./CreatePostComponent": "./src/components/CreatePostComponent",
        "./CreateHelpRequestComponent": "./src/components/CreateHelpReqComponent",
        "./HelpRequestComponent": "./src/components/HelpRequestComponent",
        "./CreateEmergencyAlertComponent": "./src/components/CreateEmergAlertComponent",
        "./EmergencyAlertComponent": "./src/components/EmergencyAlertComponent",
        "./HelpRequestRoute": "./src/routes/HelpRequestRoute",
        "./EmergencyAlertRoute": "./src/routes/EmergencyAlertRoute",
      },
      shared: ["react", "react-dom", "react-router-dom", "@apollo/client"],
    }),
    {
      name: "custom-logger",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          console.log(`\n🚀 resident-app → http://localhost:${PORT}\n`);
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
