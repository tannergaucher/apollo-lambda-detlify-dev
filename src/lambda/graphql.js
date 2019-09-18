const { ApolloServer } = require('apollo-server-lambda')
const { resolvers } = require('../resolvers')
const { typeDefs } = require('../schema')
const { models: db } = require('../models')
const mongoose = require('mongoose')

// Connect to db.
try {
  await mongoose.connect(
    // Replace with process.env.DATABASE_URL
    'mongodb+srv://Tanner:tanner@cluster0-3e5sp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
} catch (error) {
  console.log(error)
}

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

exports.handler = server.createHandler()
