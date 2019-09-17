const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type User {
    name: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    signup(name: String!): User
  }
`

module.exports = {
  typeDefs,
}
