import { gql } from "graphql-tag";

const typeDefs = gql`
  type Resident {
    id: ID!
    userID: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    test: String!
  }

  type Mutation {
    test(text: String!): String!
  }
`;

export default typeDefs;
