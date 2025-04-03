import { gql } from "graphql-tag";

const typeDefs = gql`
  type AI {
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
    summarizePost(postId: String!, force: Boolean): String!
  }
`;

export default typeDefs;
