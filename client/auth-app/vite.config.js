import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const APP_NAME = "authApp";
const PORT = 3001;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: APP_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./TestAllComponents": "./src/App",
        "./LoginComponent": "./src/components/LoginComponent",
        "./SignUpComponent": "./src/components/SignUpComponent",
        "./LogoutComponent": "./src/components/LogoutComponent",
      },
      shared: ["react", "react-dom", "react-router-dom", "@apollo/client"],
    }),
    {
      name: "custom-logger",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          console.log(`\n🚀 auth-app → http://localhost:${PORT}\n`);
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
