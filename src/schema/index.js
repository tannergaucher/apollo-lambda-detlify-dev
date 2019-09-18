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

  type Query {
    user(id: ID!): User
    users: [User!]
    todos(userId: ID!): [Todo!]
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createTodo(text: String!): Todo!
    updateTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`

module.exports = {
  typeDefs,
}
