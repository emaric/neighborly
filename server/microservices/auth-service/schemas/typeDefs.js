import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    username: String!
    role: String!
    token: String
  }

  type Query {
    verify: User
  }

  type Mutation {
    signup(username: String!, password: String!): Boolean
    login(username: String!, password: String!): User
    logout: Boolean
  }
`;

export default typeDefs;
