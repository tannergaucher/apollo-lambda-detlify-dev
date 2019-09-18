import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    password
    todos {
      ...TodoFragment
    }
  }
`

export const TODO_FRAGMENT = gql`
  fragment TodoFragment on Todo {
    id
    isCompleted
    text
    userId
  }
`

export const TODOS_QUERY = gql`
  query TODOS_QUERY($userId: ID!) {
    todos(userId: $userId) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($name: String!, $email: String!, $password: String!) {
    login(name: $name, email: $email, password: $password) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
