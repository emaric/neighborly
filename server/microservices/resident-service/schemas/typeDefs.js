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
    createdAtISO: String
    updatedAtISO: String
  }

  type HelpRequest {
    id: ID!
    userId: String!
    title: String!
    description: String!
    location: String
    status: String
    createdAt: String
    updatedAt: String
  }

  type EmergencyAlert {
    id: ID!
    userId: String!
    message: String!
    location: String
    urgencyLevel: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getPosts: [Post!]
    getPost(id: ID!): Post
    getHelpRequests: [HelpRequest!]
    getHelpRequest(id: ID!): HelpRequest
    getEmergencyAlerts: [EmergencyAlert!]
    getEmergencyAlert(id: ID!): EmergencyAlert
  }

  type Mutation {
    createPost(title: String!, content: String): Post!
    createHelpRequest(title: String!, description: String!, location: String): HelpRequest!
    createEmergencyAlert(message: String!, location: String, urgencyLevel: String): EmergencyAlert!
  }
`;

export default typeDefs;
