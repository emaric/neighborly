import { gql } from "graphql-tag";

const typeDefs = gql`
  type Resident {
    id: ID!
    userId: String!
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: ID!
    title: String!
    content: String
    contentPreview: String
    userId: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getPosts: [Post!]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String): Post!
  }
`;

export default typeDefs;
