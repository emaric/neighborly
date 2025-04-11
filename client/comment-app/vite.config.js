import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const APP_NAME = "commentApp";
const PORT = 3003;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: APP_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./TestAllComponents": "./src/App",
        "./CommentListComponent": "./src/components/CommentListComponent",
        "./CreateCommentComponent": "./src/components/CreateCommentComponent",
        "./PostRoute": "./src/routes/PostRoute",
        "./HelpRequestRoute": "./src/routes/HelpRequestRoute",
        "./EmergencyAlertRoute": "./src/routes/EmergencyAlertRoute",
      },
      shared: ["react", "react-dom", "react-router-dom", "@apollo/client"],
    }),
    {
      name: "custom-logger",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          console.log(`\n🚀 comment-app → http://localhost:${PORT}\n`);
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
