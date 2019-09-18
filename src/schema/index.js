const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    todos: [Todo!]
  }

  type Todo {
    id: ID!
    text: String!
    isCompleted: Boolean!
    userId: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type SuccessMessage {
    message: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createTodo(text: String!): Todo!
    updateTodo(id: ID!, text: String!): Todo!
    deleteTodo(id: ID!): SuccessMessage
  }
`

module.exports = {
  typeDefs,
}
