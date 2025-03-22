import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
    token: String
  }

  type Query {
    verify: User
    getUser(id: ID!): User
  }

  type Mutation {
    signup(username: String!, password: String!, role: String!): Boolean
    login(username: String!, password: String!): User
    logout: Boolean
  }
`;

export default typeDefs;
