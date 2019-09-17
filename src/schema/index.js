const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    user: User
  }

  type Mutation {
    signup(name: String!): User
  }

  type User {
    name: String!
  }
`

module.exports = {
  typeDefs,
}
