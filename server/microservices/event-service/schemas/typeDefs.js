import { gql } from "graphql-tag";

const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String
    datetime: String!
    location: String!
    userId: String!
    volunteers: [String!]!
    createdAt: String
    updatedAt: String
    createdAtISO: String
    updatedAtISO: String
  }

  type Query {
    test: String!
    getEvents: [Event!]!
    getEvent(id: ID!): Event!
    getSuggestedDateTimes: [String!]!
    getPossibleVolunteers: [String!]!
  }

  type Mutation {
    test(text: String!): String!
    createEvent(
      title: String!
      description: String
      datetime: String!
      location: String!
    ): Event!
  }
`;

export default typeDefs;
