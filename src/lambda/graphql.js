const { ApolloServer, gql } = require('apollo-server-lambda')
const { resolvers } = require('../resolvers')

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    test: String
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler()
