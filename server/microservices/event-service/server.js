import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/federation";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { EVENT_PORT, FRONTEND_URI } from "../../common/config.js";
import { authMiddleware } from "../../common/authMiddleware.js";
import connectToDatabase from "../../common/mongoose.js";
import typeDefs from "./schemas/typeDefs.js";
import resolvers from "./resolvers/event.resolvers.js";
import { formatServiceLog } from "../../common/utils.js";

connectToDatabase();

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

await server.start();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URI, credentials: true }));
app.use(authMiddleware);

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {
        req,
        res,
        user: req.user,
      };
    },
  })
);

app.listen(EVENT_PORT, async () => {
  console.log(
    formatServiceLog("Event", `http://localhost:${EVENT_PORT}/graphql`)
  );
});
