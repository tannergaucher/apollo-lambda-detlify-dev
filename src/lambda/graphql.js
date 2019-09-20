const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-lambda')
const { resolvers } = require('../resolvers')
const { typeDefs } = require('../schema')
const { models: db } = require('../models')

mongoose.connect(process.env.REACT_APP_DATABASE_URL, { useNewUrlParser: true })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async request => {
    return {
      db,
      request,
    }
  },
})

exports.handler = server.createHandler({
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  },
})
