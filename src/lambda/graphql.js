const { ApolloServer } = require('apollo-server-lambda')
const { resolvers } = require('../resolvers')
const { typeDefs } = require('../schema')
const models = require('../models')
const mongoose = require('mongoose')

const { models: db } = models

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async request => {
    // connect to db here

    return {
      db,
      request,
    }
  },
})

mongoose
  .connect(
    'mongodb+srv://Tanner:tanner@cluster0-3e5sp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected')
  })
  .catch(err => console.log(err))

exports.handler = server.createHandler()
