import { gql } from "graphql-tag";

const typeDefs = gql`
  type AI {
    id: ID!
    userID: String!
    createdAt: String
    updatedAt: String
  }

  type PostSummary {
    id: ID!
    postId: String!
    summary: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    test: String!
    getPostSummary(postId: String!): PostSummary
  }

  type Mutation {
    test(text: String!): String!
    summarizePost(postId: String!, force: Boolean): PostSummary!
  }
`;

export default typeDefs;
