import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import cors from "cors";
import { authMiddleware } from "./common/authMiddleware.js";
import cookieParser from "cookie-parser";
import {
  AI_PORT,
  AUTH_PORT,
  BUSINESS_PORT,
  COMMENT_PORT,
  EVENT_PORT,
  FRONTEND_URI,
  GATEWAY_PORT,
  RESIDENT_PORT,
} from "./common/config.js";
import { formatServiceLog } from "./common/utils.js";

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    try {
      request.http.headers.set("x-request-source", "gateway");
      if (context.req?.cookies) {
        const cookieHeader = Object.entries(context.req?.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join("; ");

        request.http.headers.set("Cookie", cookieHeader);
      }
    } catch (error) {
      console.error("Error setting cookies for services", error.message);
    }
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: "auth", url: process.env.AUTH_URL || `http://localhost:${AUTH_PORT}/graphql` },
    { name: "business", url: process.env.BUSINESS_URL || `http://localhost:${BUSINESS_PORT}/graphql` },
    { name: "comment", url: process.env.COMMENT_URL || `http://localhost:${COMMENT_PORT}/graphql` },
    { name: "event", url: process.env.EVENT_URL || `http://localhost:${EVENT_PORT}/graphql` },
    { name: "resident", url: process.env.RESIDENT_URL || `http://localhost:${RESIDENT_PORT}/graphql` },
    { name: "ai", url: process.env.AI_URL || `http://localhost:${AI_PORT}/graphql` },
  ],
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  plugins: [
    {
      requestDidStart: async () => {
        return {
          willSendResponse: ({ response }) => {
            const isLogout = response.body?.singleResult?.data?.logout;
            if (isLogout) {
              response.http.headers.set(
                "Set-Cookie",
                "token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
              );
            } else {
              const token = response.body?.singleResult?.data?.login?.token;

              if (token) {
                response.http.headers.set(
                  "Set-Cookie",
                  `token=${token}; HttpOnly`
                );
                response.body.singleResult.data.login.token = "";
              }
            }
          },
        };
      },
    },
  ],
});

await server.start();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URI,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  })
);
app.use(authMiddleware);

// Apollo Server middleware for Express
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res, user: req.user }),
  })
);

app.listen(GATEWAY_PORT, () => {
  console.log(
    formatServiceLog("Gateway", `http://localhost:${GATEWAY_PORT}/graphql`)
  );
});
