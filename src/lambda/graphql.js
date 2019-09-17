const { ApolloServer, gql } = require('apollo-server-lambda')
const { resolvers } = require('../resolvers')
const { typeDefs } = require('../schema')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

exports.handler = server.createHandler()
