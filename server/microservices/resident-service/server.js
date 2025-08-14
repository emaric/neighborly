import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildFederatedSchema } from "@apollo/federation";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { FRONTEND_URI, RESIDENT_PORT } from "../../common/config.js";
import { authMiddleware } from "../../common/authMiddleware.js";
import connectToDatabase from "../../common/mongoose.js";
import typeDefs from "./schemas/typeDefs.js";
import residentResolvers from "./resolvers/resident.resolvers.js";
import postResolvers from "./resolvers/post.resolvers.js";
import helpRequestResolvers from "./resolvers/helpReq.resolvers.js";
import emergencyAlertResolvers from "./resolvers/emergAlert.resolvers.js";
import { formatServiceLog } from "../../common/utils.js";

connectToDatabase();

const resolvers = {
  Query: {
    ...residentResolvers.Query,
    ...postResolvers.Query,
    ...helpRequestResolvers.Query,
    ...emergencyAlertResolvers.Query,
  },
  Mutation: {
    ...residentResolvers.Mutation,
    ...postResolvers.Mutation,
    ...helpRequestResolvers.Mutation,
    ...emergencyAlertResolvers.Mutation,
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
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

const resident_port = process.env.PORT || RESIDENT_PORT
app.listen(resident_port, async () => {
  console.log(formatServiceLog("Resident", `http://localhost:${resident_port}/graphql`));
});