export const typeDefs = `#graphql

  type User {
    userId: ID!
    name: String!
    lastName: String
    dob: String
    profile: Profile
  }

  type Profile {
    id: ID!
    location: String!
    userId: String!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
    profile(id: ID!): Profile!
    profiles: [Profile!]!
  }

  type Mutation {
    updateUserLocation(userId: ID!, newLocation: String!): Profile!
  }
`;

