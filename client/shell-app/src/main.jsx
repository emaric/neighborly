import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const link = createHttpLink({
  uri: "https://neighborly-app-api.onrender.com/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider />
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
