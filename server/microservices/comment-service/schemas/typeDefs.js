import { gql } from "graphql-tag";

const typeDefs = gql`
  type Comment {
    id: ID!
    parentId: String!
    content: String!
    userId: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCommentsByParentId(parentId: String!): [Comment]
    getCommentCountByParentId(parentId: String!): Int
  }

  type Mutation {
    createComment(parentId: String!, content: String!): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Comment
  }
`;

export default typeDefs;
