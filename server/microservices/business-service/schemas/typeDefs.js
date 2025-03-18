import { gql } from "graphql-tag";

const typeDefs = gql`
  type Business {
    id: ID!
    name: String!
    userId: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getBusinessList: [Business]
  }

  type Mutation {
    addBusiness(name: String!): Business
    updateBusiness(id: ID!, name: String!): Business
  }
`;

export default typeDefs;
