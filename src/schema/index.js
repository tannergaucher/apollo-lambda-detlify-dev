const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type User {
    name: String!
    email: String!
    password: String!
  }

  type Todo {
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
    createTodo(text: String!): Todo!
    updateTodo: Todo!
    deleteTodo: Todo!
  }
`

module.exports = {
  typeDefs,
}
