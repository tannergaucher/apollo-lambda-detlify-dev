const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    test: String
  }
`

module.exports = {
  typeDefs,
}
