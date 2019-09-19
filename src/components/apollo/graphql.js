import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    password
    todos {
      id
      isCompleted
      text
      userId
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

export const AUTH_PAYLOAD_FRAGMENT = gql`
  fragment AuthPayloadFragment on AuthPayload {
    user {
      ...UserFragment
    }
    token
  }
  ${USER_FRAGMENT}
`

export const TODOS_QUERY = gql`
  query TODOS_QUERY($userId: ID!) {
    todos(userId: $userId) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const IS_LOGGED_IN_QUERY = gql`
  query IS_LOGGED_IN_QUERY {
    isLoggedIn @client
  }
`

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...AuthPayloadFragment
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      ...AuthPayloadFragment
    }
  }
  ${AUTH_PAYLOAD_FRAGMENT}
`

export const CREATE_TODO_MUTATION = gql`
  mutation CREATE_TODO_MUTATION($text: String!) {
    createTodo(text: $text) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`
