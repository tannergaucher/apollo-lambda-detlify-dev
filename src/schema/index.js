const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type User {
    name: String!
  }

  type Todo {
    text: String!
    isCompleted: Boolean!
    userId: ID!
  }

  type Query {
    user(id: ID!): User
    users: [User!]
    todos(userId: ID!): [Todo!]
    me: User
  }

  type Mutation {
    signup(name: String!): User
    createTodo(text: String!, userId: ID!): Todo!
    updateTodo: Todo!
    deleteTodo: Todo!
  }
`

module.exports = {
  typeDefs,
}
